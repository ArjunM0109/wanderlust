const express = require("express");
const router = express.Router();
const { addReview  , deleteReview } = require("../Controlers/ReviewControler");


router.post("/:UserId/add/:id", addReview); // add New Review 
router.delete("/:ListingId/delete/:id" , deleteReview); // delete Review

module.exports = router;
