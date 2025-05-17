const express = require('express');
const port = process.env.PORT || 3500;
const app = express();
const router = require('./routes/root')
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', router)





app.all("*path", (req, res) => {
  try {
    if (req.accepts('html')) {
      res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
      res.status(404).json({ error: '404 Not Found' });
    } else {
      res.status(404).type('txt').send('404 Not Found');
    }
  } catch (error) {
    console.error('404 Handler Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});