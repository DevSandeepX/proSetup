const mongoose = require('mongoose');
const { logEvents } = require('../middlewares/logger');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log('MongoDB connected');
  } catch (error) {
    await logEvents(`${error.code || 'NO_CODE'}\t${error.name}\t${error.message}`, 'dbLogs.log');
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
