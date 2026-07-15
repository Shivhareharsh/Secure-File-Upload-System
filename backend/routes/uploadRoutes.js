const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  uploadFile,
  deleteFile,
  getHistory,
} = require("../controllers/uploadController");

const fileValidation = require("../middleware/fileValidation");

const router = express.Router();

// ===============================
// Multer Storage Configuration
// ===============================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
});

// ===============================
// Upload File
// ===============================

router.post(
  "/",
  upload.single("file"),
  fileValidation,
  uploadFile
);

// ===============================
// Upload History
// ===============================

router.get("/history", getHistory);

// ===============================
// Download File
// ===============================

router.get("/download/:fileName", (req, res) => {
  const filePath = path.join(
    __dirname,
    "..",
    "uploads",
    req.params.fileName
  );

  res.download(filePath, (err) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: "File not found.",
      });
    }
  });
});

// ===============================
// Delete Uploaded File
// ===============================

router.delete("/:fileName", deleteFile);

module.exports = router;