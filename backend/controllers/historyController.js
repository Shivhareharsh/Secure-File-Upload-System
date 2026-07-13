const fs = require("fs-extra");
const path = require("path");

const getHistory = async (req, res) => {
  try {
    console.log("========== HISTORY REQUEST ==========");

    const historyPath = path.join(
      __dirname,
      "..",
      "data",
      "history.json"
    );

    console.log("History file path:", historyPath);

    // If history.json doesn't exist
    const exists = await fs.pathExists(historyPath);

    console.log("History file exists:", exists);

    if (!exists) {
      return res.status(200).json([]);
    }

    // Read history.json
    const history = await fs.readJson(historyPath);

    console.log("History data:");
    console.log(history);

    return res.status(200).json(history);

  } catch (err) {
    console.log("========== HISTORY ERROR ==========");
    console.error(err);
    console.log("===================================");

    return res.status(500).json({
      success: false,
      message: "Unable to load upload history.",
      error: err.message,
    });
  }
};

module.exports = {
  getHistory,
};