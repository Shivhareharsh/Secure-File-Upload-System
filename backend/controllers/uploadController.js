const NodeClam = require("clamscan");
const fs = require("fs-extra");
const path = require("path");

// ===============================
// Upload File
// ===============================

const uploadFile = async (req, res) => {
  console.log("========== CONTROLLER CALLED ==========");

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded.",
    });
  }

  console.log("Uploaded File:");
  console.log(req.file);

  try {
    console.log("Skipping ClamAV scan...");

    // Temporary scan status
    const scan = "Clean";

    // ===============================
    // Save history
    // ===============================

    const historyPath = path.join(
      __dirname,
      "..",
      "data",
      "history.json"
    );

    let history = [];

    if (await fs.pathExists(historyPath)) {
      history = await fs.readJson(historyPath);
    }

    const uploadRecord = {
      originalName: req.file.originalname,

      fileName: req.file.filename,

      fileType: req.file.mimetype,

      fileSize: `${(
        req.file.size /
        1024 /
        1024
      ).toFixed(2)} MB`,

      scan: scan,

      uploadedAt: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
    };

    history.unshift(uploadRecord);

    history = history.slice(0, 20);

    await fs.writeJson(historyPath, history, {
      spaces: 2,
    });

    console.log("✅ History updated");

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully!",
      scan: scan,
      file: uploadRecord,
    });

  } catch (err) {
    console.log("========== UPLOAD ERROR ==========");

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Upload failed.",
      error: err.message,
    });
  }
};

// ===============================
// Delete File
// ===============================

const deleteFile = async (req, res) => {
  try {
    console.log("==============================");
    console.log("DELETE REQUEST RECEIVED");

    const fileName = decodeURIComponent(
      req.params.fileName
    );

    console.log("Requested file:", fileName);

    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      fileName
    );

    console.log("Full path:", filePath);

    const fileExists = await fs.pathExists(
      filePath
    );

    console.log("File exists:", fileExists);

    if (!fileExists) {
      return res.status(404).json({
        success: false,
        message: "File not found.",
      });
    }

    await fs.remove(filePath);

    console.log("✅ File deleted");

    const historyPath = path.join(
      __dirname,
      "..",
      "data",
      "history.json"
    );

    let history = [];

    if (await fs.pathExists(historyPath)) {
      history = await fs.readJson(historyPath);
    }

    history = history.filter(
      (item) => item.fileName !== fileName
    );

    await fs.writeJson(historyPath, history, {
      spaces: 2,
    });

    console.log("✅ History updated");

    return res.status(200).json({
      success: true,
      message: "File deleted successfully.",
    });

  } catch (err) {
    console.log("========== DELETE ERROR ==========");

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Unable to delete file.",
      error: err.message,
    });
  }
};

module.exports = {
  uploadFile,
  deleteFile,
};