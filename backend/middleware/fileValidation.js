const allowedTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
  ];
  
  const fileValidation = (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
  
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type",
      });
    }
  
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "File size exceeds 5 MB",
      });
    }
  
    next();
  };
  
  module.exports = fileValidation;