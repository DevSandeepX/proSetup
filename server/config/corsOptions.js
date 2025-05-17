const allowOrigins = require("./allowOrigins")

const corsOptions = {
    origin: (origin, callback) => {
        if (allowOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          console.warn(`Blocked by CORS: ${origin}`);
          callback(new Error('Not allowed by CORS'));
        }
      },
    
    optionsSuccessStatus: 200,
    credentials: true,

}


module.exports = corsOptions