const express = require("express");
const router = express.Router();
const { Home, addListing , getListingById , deleteListing , updateListing , AllData } = require("../Controlers/ListingControler");
const validate = require("../Middlewares/ValidateMiddleware");
const listingValidate = require("../Validators/ListingValidate");

//const multer  = require('multer');
//const {storage} = require("../cloudConfig.js")
//const upload = multer({ storage });
// router.post("/:UserId/List/New",upload.single('listing[image]'), validate(listingValidate), addListing); // Add new listing Route


router.get("/", Home); // Home Route
router.get("/List/:id" , getListingById); //  Get Listing Route
router.delete("/List/:id", deleteListing); // Delete Listing Route
router.put("/:UserId/List/:id",validate(listingValidate), updateListing); // Update Listing Route
router.get("/AllData",AllData); // get all Listing Details or count
router.post("/:UserId/List/New",validate(listingValidate),addListing);  // Add new listing
module.exports = router;



