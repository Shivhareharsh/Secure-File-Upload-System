const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(9000, () => {
  console.log("Server running on 9000");
});