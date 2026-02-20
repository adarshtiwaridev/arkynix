import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
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
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    service: {
      type: String,
      required: true,
      enum: [
        // Creative & Media
        "ad-shoot",
        "photo-shoot",
        "videography",
        "video-production",

        // Digital Presence
        "branding",
        "social-media",
        "marketing",
        "website-design",

        // App & Web Development
        "web-dev",
        "app-dev",
        "ui-ux",
        "custom-software",
      ],
    },

    budget: {
      type: String,
      trim: true,
      default: "",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    message: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 2000,
    },

    status: {
      type: String,
      enum: ["new", "in-progress", "closed", "archived"],
      default: "new",
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);
