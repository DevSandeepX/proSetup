const express = require('express');
const port = process.env.PORT || 3500;
require('dotenv').config()
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const logEvents = require('./middlewares/logger')
const app = express();
const root = require('./routes/root')
const path = require('path');
const {logger} = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler')
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/dbConn');




app.use(cors(corsOptions))
app.use(logger)
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', root)
app.use('/user', userRoutes)






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


app.use(errorHandler)

// server.js or index.js
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

