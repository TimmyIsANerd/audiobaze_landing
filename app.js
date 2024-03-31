const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use("/assets", express.static("assets"));

// Routes
app.get("/", (req, res) => {
  console.log(`Request made : ${req.url}`);
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
