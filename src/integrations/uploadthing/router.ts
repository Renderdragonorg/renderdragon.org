import { createUploadthing, type FileRouter } from "uploadthing/express";

// Define an UploadThing router that allows common creative assets
const f = createUploadthing();

export const uploadRouter = {
  mediaUploader: f({
    // Use allowed discrete sizes from UploadThing's type union
    image: { maxFileSize: "32MB", maxFileCount: 10 },
    video: { maxFileSize: "512MB", maxFileCount: 5 },
    audio: { maxFileSize: "64MB", maxFileCount: 10 },
  }).onUploadComplete(({ file, metadata }) => {
    // We are not writing to the DB here; the client inserts rows after upload.
    // This callback still runs on the server and can be used for logging.
    console.log("Upload complete:", {
      name: file.name,
      url: file.url,
      key: file.key,
      size: file.size,
      metadata,
    });
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
