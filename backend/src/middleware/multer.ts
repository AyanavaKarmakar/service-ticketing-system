import path from "path";
import multer from "multer";

const upload = multer({
  limits: {
    // 2 MB file size limit
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    const filetypes = /pdf|doc|docx|jpg|jpeg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, DOCX, JPG, and PNG files are allowed"));
    }
  },
});
