const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3070;

// ⚖️ NEXUS LAW: Handshake Protocol Injection (Frontend Layer)
// Note: We do not BLOCK frontend requests to allow public access, 
// but we sign responses to prove compliance.
app.use((req, res, next) => {
  res.set('X-Nexus-Handshake', '55-45-17');
  next();
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle SPA routing - return index.html for any unknown route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`N3XUS STREAM Frontend running on port ${port}`);
});
