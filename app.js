const express = require('express'); // the package for express app
const path = require('path');
const app = express(); // create the express app (the backend)

// Port setting
const PORT = process.env.PORT || 8080;

// Serve api requests under '/build'
app.use('/api*', express.static(path.join(__dirname, 'public')));

// Serve API routes (regex could be used | '/api(/*)?')
app.get('/api', (req, res) => {
    res.json({ message: "This is an API response" });
});  

// Continue to handle all routes after /api/
app.get('/api/*', (req, res) => {
    res.json({ message: "This is an API + blah blah response" });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public/dist')));
 
// The "catchall" handler: return React's index.html when no path applies
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on\nhttp://localhost:${PORT}`);
});