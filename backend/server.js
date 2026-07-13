console.log("🚀 SERVER FILE LOADED");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const uploadRoutes = require("./routes/uploadRoutes");
const historyRoutes = require("./routes/historyRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Log every request
app.use((req, res, next) => {
  console.log("================================");
  console.log(req.method, req.url);
  console.log("================================");
  next();
});

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Upload API
app.use("/api/upload", uploadRoutes);
app.use("/api/history", historyRoutes);

// Test API
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Secure File Upload Backend Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});