"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  X,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  Video,
  Trash2,
} from "lucide-react";

/* ================= CONSTANTS ================= */
const ITEMS_PER_PAGE = 5;

/* ================= SMALL HELPER ================= */
function Detail({ label, value }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-foreground/60">{label}</span>
      <span className="font-medium text-right">{value || "—"}</span>
    </div>
  );
}

export default function DashboardClient() {
  /* ================= CONTACT STATE ================= */
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
      if (!res.ok) throw new Error("Logout failed");
      if(res.ok){
        toast.success("Logged out successfully");
        localStorage.removeItem("auth_token");
      }
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
      // fallback
      window.location.href = "/login";
    }
  }; 
  /* ================= MEDIA STATE ================= */
  const [mediaType, setMediaType] = useState("photo"); // photo | video
  const [media, setMedia] = useState([]);

  /* ================= UPLOAD MODAL ================= */
  const [modalType, setModalType] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  /* ================= FETCH CONTACTS ================= */
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("/api/contact");
        const data = await res.json();
  console.log("Fetched contacts:", data);
        const allowed = [
          "ad-shoot",
          "photo-shoot",
          "videography",
          "video-production",
          "branding",
          "social-media",
          "marketing",
        ];

        setContacts(data.filter((c) => allowed.includes(c.service)));
      } catch (err) {
        console.error("Contact fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  /* ================= FETCH MEDIA ================= */
  useEffect(() => {
    const fetchMedia = async () => {
      const res = await fetch(`/api/gallery?type=${mediaType}`);
      if (!res.ok) return;
      const data = await res.json();
      setMedia(data);
    };
    fetchMedia();
  }, [mediaType]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(contacts.length / ITEMS_PER_PAGE);

  const paginatedContacts = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return contacts.slice(start, start + ITEMS_PER_PAGE);
  }, [contacts, page]);

/* ================= UPLOAD ================= */

const handleUpload = async () => {
  if (!file) {
    toast.error("Please select a file");
    return;
  }

  if (!title.trim()) {
    toast.error("Please enter a title");
    return;
  }

  setIsUploading(true);

  try {
    let uploadFile = file;
    const resourceType = modalType === "video" ? "video" : "image";

    // Validate file type
    const validImageTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    const validVideoTypes = ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"];
    const validTypes = resourceType === "image" ? validImageTypes : validVideoTypes;

    if (!validTypes.includes(file.type)) {
      toast.error(`Invalid ${resourceType} format. Supported: ${validTypes.join(", ")}`);
      setIsUploading(false);
      return;
    }

    // Check size limits
    const IMAGE_SIZE_LIMIT = 50 * 1024 * 1024; // 50MB for images
    const VIDEO_SIZE_LIMIT = 500 * 1024 * 1024; // 500MB for videos
    
    if (resourceType === "image" && file.size > IMAGE_SIZE_LIMIT) {
      toast.error(`Image too large. Max ${IMAGE_SIZE_LIMIT / (1024 * 1024)}MB. Received: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
      setIsUploading(false);
      return;
    }

    if (resourceType === "video" && file.size > VIDEO_SIZE_LIMIT) {
      toast.error(`Video too large. Max ${VIDEO_SIZE_LIMIT / (1024 * 1024)}MB. Received: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
      setIsUploading(false);
      return;
    }

    /* 🔹 Optional compression for large videos */
    if (modalType === "video" && file.size > 50 * 1024 * 1024) {
      toast("Compressing video… ⏳");
      const { compressVideoNative } = await import(
        "../../utils/compressVideo.client"
      );
      uploadFile = await compressVideoNative(file);
    }

    let cloudData;

    /* 🔹 Large files → proxy */
    if (uploadFile.size > 50 * 1024 * 1024) {
      console.log("Using proxy upload for large file:", uploadFile.name);
      const toastId = toast("Uploading large file…", );
      
      const proxyForm = new FormData();
      proxyForm.append("file", uploadFile);
      proxyForm.append("folder", "studio-gallery");
      proxyForm.append("resource_type", resourceType);

      try {
        const proxyRes = await fetch("/api/upload/proxy", {
          method: "POST",
          body: proxyForm,
        });

        if (!proxyRes.ok) {
          const err = await proxyRes.json().catch(() => ({ message: "Upload failed" }));
          console.error("[CLIENT] Proxy upload failed:", err);
          toast.error(err?.message || "Proxy upload failed", { id: toastId });
          throw new Error(err?.message || "Proxy upload failed");
        }

        cloudData = await proxyRes.json();
        console.log("Proxy upload success:", cloudData);
        toast.success("Upload completed", { id: toastId });
      } catch (err) {
        toast.error(err?.message || "Upload failed", { id: toastId });
        throw err;
      }
    }

    /* 🔹 Normal signed upload */
    else {
      console.log("Using direct Cloudinary upload");
      const toastId = toast(`Uploading ${resourceType}…`, { duration: 10000 });
      
      try {
        const signRes = await fetch("/api/cloudinary-signature", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resourceType }),
        });

        if (!signRes.ok) {
          toast.error("Failed to get signature", { id: toastId });
          throw new Error("Failed to get signature");
        }

        const sign = await signRes.json();
        console.log("Signature received:", { timestamp: sign.timestamp, cloudName: sign.cloudName });

        const cloudForm = new FormData();
        cloudForm.append("file", uploadFile);
        cloudForm.append("api_key", sign.apiKey);
        cloudForm.append("timestamp", sign.timestamp);
        cloudForm.append("signature", sign.signature);
        cloudForm.append("folder", "studio-gallery");

        const cloudRes = await fetch(
          `https://api.cloudinary.com/v1_1/${sign.cloudName}/${resourceType}/upload`,
          {
            method: "POST",
            body: cloudForm,
          }
        );

        if (!cloudRes.ok) {
          const err = await cloudRes.json().catch(() => ({}));
          console.error("[CLIENT] Cloudinary upload failed:", err);
          toast.error(err.error?.message || `Cloudinary ${resourceType} upload failed`, { id: toastId });
          throw new Error(err.error?.message || `Cloudinary ${resourceType} upload failed`);
        }

        cloudData = await cloudRes.json();
        console.log("Cloudinary upload success:", cloudData);
      } catch (sigErr) {
        console.error("[CLIENT] Signature/Upload error:", sigErr);
        throw sigErr;
      }
    }

    if (!cloudData?.secure_url || !cloudData?.public_id) {
      throw new Error("Invalid response from upload service");
    }

    /* 🔹 Save to DB */
    const galleryRes = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        tags,
        type: modalType,
        url: cloudData.secure_url,
        publicId: cloudData.public_id,
      }),
    });

    if (!galleryRes.ok) {
      const err = await galleryRes.json().catch(() => ({}));
      throw new Error(err?.message || "Failed to save to database");
    }

    const savedMedia = await galleryRes.json();
    console.log("Media saved to database:", savedMedia);

    toast.success(`${resourceType === "video" ? "Video" : "Image"} uploaded successfully 🚀`);

    setMedia((prev) => [savedMedia, ...prev]);

    setModalType(null);
    setFile(null);
    setTitle("");
    setTags("");
  } catch (err) {
    console.error("[CLIENT] Upload failed:", err);
    const errorMsg = err?.message || "Upload failed. Please try again.";
    toast.error(errorMsg);
  } finally {
    setIsUploading(false);
  }
};




  /* ================= DELETE MEDIA ================= */
  const handleDeleteMedia = async (id) => {
    const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE", credentials: "same-origin" });

    if (res.status === 401) {
      router.push("/login");
      return;
    }
    if(res.ok){
        toast.success("Media deleted successfully");
    } 

    if (!res.ok) {
      const err = await res.json();
      console.error("Delete failed:", err);
      alert(err?.message || "Delete failed");
      return;
    }
    setMedia((prev) => prev.filter((m) => m._id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground mt-20 px-8 py-10">

      {/* ================= FOUNDER SECTION ================= */}
      <div className=" mx-auto mb-14 rounded-3xl border hover:border-b-amber-800 border-border bg-card px-1 py-5 flex flex-col md:flex-row gap-8 items-center">
        <img
          src="/photos/image03.avif" // <-- replace with real image
          alt="Founder"
          className="h-28 w-28 rounded-full object-cover border border-border"
        />
        <div>
          <h2 className="text-2xl font-extrabold">Adarsh Tiwari</h2>
          <p className="text-sm text-foreground/60 mt-1">
            Founder & Full-Stack Engineer
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/80">
            “We don’t chase trends — we build systems that last.  
            Every product here is crafted with discipline, performance,
            and long-term vision in mind.”
          </p>
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <div className="flex flex-wrap gap-5 items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold">Studio Dashboard</h1>
          <p className="text-sm text-foreground/60">
            Contacts, reels & media management
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={handleLogout} className="px-4 hover:bg-foreground/30 py-2 rounded-xl border border-border text-sm">Logout</button>
          <button
            onClick={() => setModalType("photo")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white"
          >
            <ImageIcon size={16} />
            Upload Photo
          </button>
          <button
            onClick={() => setModalType("video")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white"
          >
            <Video size={16} />
            Upload Video
          </button>
        </div>
      </div>

      {/* ================= CONTACT TABLE ================= */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-foreground/5">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Budget</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              paginatedContacts.map((c) => (
                <tr
                  key={c._id}
                  onClick={() => setSelectedContact(c)}
                  className="border-t border-border hover:bg-foreground/5 cursor-pointer"
                >
                  <td className="px-6 py-4">{c.name}</td>
                  <td className="px-6 py-4">{c.email}</td>
                  <td className="px-6 py-4 capitalize">
                    {c.service.replace("-", " ")}
                  </td>
                  <td className="px-6 py-4">
                   
                    {c.location ? `${c.location}` : "—"}
                  </td>
                  <td className="px-6 py-4">
                    {c.budget}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-border">
          <span className="text-sm text-foreground/60">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 rounded-lg border border-border disabled:opacity-40"
            >
              Prev
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 rounded-lg border border-border disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ================= MEDIA LIBRARY ================= */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold">Media Library</h2>
          <div className="flex rounded-xl border border-border overflow-hidden">
            {['photo', 'video'].map((type) => (
              <button
                key={type}
                onClick={() => setMediaType(type)}
                className={`px-5 py-2 text-sm font-medium
                  ${mediaType === type
                    ? "bg-foreground text-background"
                    : "text-foreground/60"}`}
              >
                {type === "photo" ? "Photos" : "Videos"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {media.map((item) => (
            <div
              key={item._id}
              className="group relative rounded-xl overflow-hidden border border-border"
            >
              {mediaType === "photo" ? (
                <img src={item.url} alt={item.title} className="h-64 w-full object-contain" />
              ) : (
                <video 
                  src={item.url} 
                  className="h-54 w-full object-cover" 
                  controls
                  preload="metadata"
                  muted
                />
              )}

              <div className="absolute top-0   bg-black/60 opacity-0 group-hover:opacity-100 items-end justify-center transition">
                <button
                  onClick={() => handleDeleteMedia(item._id)}
                  className="flex items-center gap-2 px-1 py-1 bg-red-600 text-white"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CONTACT DETAIL MODAL ================= */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="relative w-full max-w-xl bg-card rounded-2xl p-6">
            <button
              onClick={() => setSelectedContact(null)}
              className="absolute right-4 top-4"
            >
              <X />
            </button>
            <h2 className="text-2xl font-bold mb-6">Contact Details</h2>
            <div className="space-y-3">
              <Detail label="Name" value={selectedContact.name} />
              <Detail label="Email" value={selectedContact.email} />
              <Detail label="Phone" value={selectedContact.phone} />
              <Detail label="Service" value={selectedContact.service} />
              <Detail label="Budget" value={selectedContact.budget} />
              <Detail label="Location" value={selectedContact.location} />
              <Detail label="Message" value={selectedContact.message} />
            </div>
          </div>
        </div>
      )}

      {/* ================= UPLOAD MODAL ================= */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="relative w-full max-w-lg bg-card rounded-2xl p-6">
            <button
              onClick={() => setModalType(null)}
              className="absolute right-4 top-4"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-4">
              Upload {modalType === "photo" ? "Photo" : "Video"}
            </h2>

            <input
              type="file"
              accept={modalType === "photo" ? "image/*" : "video/*"}
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-4 w-full"
              disabled={isUploading}
            />

            {file && (
              <div className="mb-4 p-3 rounded-lg bg-foreground/5 border border-border text-sm">
                <div className="font-medium">📁 {file.name}</div>
                <div className="text-foreground/60 mt-1">
                  Size: {(file.size / (1024 * 1024)).toFixed(2)}MB
                </div>
                <div className="text-foreground/60">
                  Type: {file.type || "Unknown"}
                </div>
                {modalType === "photo" && file.size > 50 * 1024 * 1024 && (
                  <div className="text-red-500 mt-2">⚠️ Image exceeds 50MB limit</div>
                )}
                {modalType === "video" && file.size > 500 * 1024 * 1024 && (
                  <div className="text-red-500 mt-2">⚠️ Video exceeds 500MB limit</div>
                )}
              </div>
            )}

            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-3 w-full rounded-xl border border-border px-4 py-2"
              disabled={isUploading}
            />

            <input
              placeholder="Tags (comma-separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mb-5 w-full rounded-xl border border-border px-4 py-2"
              disabled={isUploading}
            />

            <button
              onClick={handleUpload}
              disabled={isUploading || !file}
              className={`w-full rounded-xl py-3 font-semibold text-white transition-all
                ${isUploading || !file
                  ? "bg-accent/50 cursor-not-allowed opacity-70" 
                  : "bg-accent hover:bg-accent/90"
                }`}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
