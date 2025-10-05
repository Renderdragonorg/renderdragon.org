import { createUploadthing } from "uploadthing/express";

// Plain JS FileRouter for Node's server.js to import
const f = createUploadthing();

export const uploadRouter = {
  mediaUploader: f({
    // Use generic categories so we can upload many file types
    image: { maxFileSize: "32MB", maxFileCount: 10 },
    video: { maxFileSize: "512MB", maxFileCount: 5 },
    audio: { maxFileSize: "64MB", maxFileCount: 10 },
    blob: { maxFileSize: "256MB", maxFileCount: 10 },
  }).onUploadComplete(({ file, metadata }) => {
    console.log("[uploadthing] Upload complete:", {
      name: file.name,
      url: file.url,
      key: file.key,
      size: file.size,
      metadata,
    });
  }),
};
