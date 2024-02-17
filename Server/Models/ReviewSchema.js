const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Import Schema from mongoose

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number, 
    min: 1,
    max: 5,
    required: true,
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: Schema.Types.ObjectId, // Corrected import here
    ref: "User",
  }
});

module.exports = mongoose.model("Review", reviewSchema);
