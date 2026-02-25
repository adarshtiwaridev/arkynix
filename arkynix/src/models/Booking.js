import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
      index: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Invalid phone number"],
    },

    /* ================= SERVICE ================= */

    service: {
      type: String,
      required: true,
      enum: [
        // AI Solutions
        "ai-agent",
        "chat-agent",
        "voice-agent",

        // Web Development
        "portfolio",
        "business",
        "ecommerce",

        // App Development
        "android",
        "ios",
        "cross",

        // Software Architecture
        "system-design",
        "cloud",
        "devops",
      ],
    },

    /* ================= MESSAGE ================= */

    message: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    /* ================= ADMIN CONTROL ================= */

    status: {
      type: String,
      enum: ["new", "in-progress", "closed"],
      default: "new",
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    source: {
      type: String,
      default: "website",
    },

    ipAddress: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

/* ================= SAFE MODEL EXPORT ================= */

export default mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);
  