const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./ReviewSchema");
const User = require("./UserSchema");
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        //required:true
    },
    imageUrl: {
        type:String,
        //required:true
    },

    price: {
        type: Number,
        //required:true
    },
    location: {
        type: String,
    }, 
    country: {
        type: String,
    },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }

});

listingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;