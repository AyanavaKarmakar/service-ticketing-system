import path from "path";
import multer from "multer";

export const upload = multer({
  limits: {
    // 2MB file size limit
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    // allowed file types regex pattern
    const allowedFileTypes = /pdf|doc|docx|jpg|png/;

    const extname = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only PDF, DOC, DOCX, JPG, and PNG files are allowed."
        )
      );
    }
  },
});
