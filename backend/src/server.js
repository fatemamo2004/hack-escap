const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

console.log('--- STARTING IN LOCAL JSON MODE ---');
// connectDB is skipped to avoid MongoDB requirement locally

app.listen(PORT, () => {
    console.log(`[SERVER] Running on port ${PORT}`);
    console.log(`[DB] Using persistent JSON storage in /data`);
});
