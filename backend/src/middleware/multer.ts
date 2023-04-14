import multer, { FileFilterCallback, MulterError } from "multer";
import type { Request } from "express";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

// Set up multer storage and file filter
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ): void => {
    cb(null, "uploads/");
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ): void => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
    cb(new MulterError("LIMIT_UNEXPECTED_FILE"));
  }
};

const limits = {
  fileSize: 2000000, // 2MB file size limit
};

export const upload = multer({
  dest: "uploads/",
  storage,
  fileFilter,
  limits,
}).single("policyUpload");

/*

Error handling:

for file size limit error, returns this response:

{
    "message": "File too large"
}

for wrong file type, returns this response:
 
{
    "message": "Unexpected field"
}

 */
