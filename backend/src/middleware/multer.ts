import multer from "multer";
import type { Request } from "express";

// Set up multer storage and file filter
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
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
    cb(
      new Error(
        "Invalid file type. Only PDF, DOC, DOCX, JPG, and PNG files are allowed."
      ),
      false
    );
  }
};

const limits = {
  fileSize: 2000000, // 2MB file size limit
};

export const upload = multer({
  dest: "uploads/",
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
}).single("policyUpload");
