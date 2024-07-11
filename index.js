const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (like CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'my_website')));

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'my_website', 'index.html'));
});

app.listen(PORT, () => {
    //console.log(`Server is running on port ${PORT}`);
});
