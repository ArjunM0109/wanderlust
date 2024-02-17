const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../Models/ListingSchema.js");

const db = "mongodb+srv://ArjunS:ASJaisal@cluster0.mmw17rz.mongodb.net/wanderlist?retryWrites=true&w=majority";

const connectDb = async () => {
  try {
    await mongoose.connect(db);
    console.log("Connection successful");
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
};

const initDB = async () => {
  try {
    await Listing.deleteMany({});

    // Modify the image field in each object of initdata.data
    initdata.data = initdata.data.map((obj) => {
      if (obj.image && obj.image.url) {
        return { ...obj, owner: "65cda9b5ebe025662c8d7009", image: obj.image.url };
      } else {
        throw new Error("Invalid image data in initdata.data");
      }
    });

    await Listing.insertMany(initdata.data);
    console.log("Data was initialized");
  } catch (err) {
    console.error("Data initialization failed:", err.message);
  }
};

const initializeDatabase = async () => {
  await connectDb();
  await initDB();
  mongoose.connection.close();
};

initializeDatabase();
