const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8001;

// Serve static files (like CSS, JavaScript)
app.use(express.static(path.join(__dirname, "public")));

// Route to serve the HTML file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
