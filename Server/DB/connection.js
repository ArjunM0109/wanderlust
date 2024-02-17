const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connection successful");
  } catch (err) {
    console.error("Database connection failed");
    process.exit(0);
  }
};

// Export the mongoose connection
module.exports = connectDb;
