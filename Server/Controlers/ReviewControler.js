const Review = require("../Models/ReviewSchema");
const Listing = require("../Models/ListingSchema");


const addReview = async (req, res) => {
  const { id, UserId } = req.params;
  try {
      let currList = await Listing.findById(id);

      if (!currList) {
          return res.status(404).json({ error: "Listing not found" });
      }

      const newReview = new Review(req.body);

      newReview.author = UserId;
      currList.reviews.push(newReview);

      await currList.save();
      await newReview.save();

      res.json("Review submitted successfully");
  } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}


const deleteReview = async (req, res) => {
  try {
    const { id, ListingId } = req.params;  
    const DeleteInList = await Listing.findByIdAndUpdate(ListingId, {$pull: {reviews: id}});
    
    if (!DeleteInList) {
      return res.status(404).json({ message: 'Listing not found or review is not associated with the listing' });
    }
    
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

 
module.exports = { addReview , deleteReview };
 