const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`[DATABASE] MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`[DATABASE] Warning: MongoDB Connection Failed. API will start but some features will be limited: ${error.message}`);
        // process.exit(1); // Keep server running for health check
    }
};

module.exports = connectDB;
