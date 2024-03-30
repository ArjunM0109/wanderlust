const express = require("express");
const { Home, addListing , getListingById , deleteListing ,updateListing } = require("../Controlers/ListingControler");
const validate = require("../Middlewares/ValidateMiddleware");
const listingValidate = require("../Validators/ListingValidate");

const multer  = require('multer');
const router = express.Router();

const upload = multer({ dest: 'uploads/userPicks' });

router.post("/:UserId/List/New", upload.single('file'), addListing); // Add new listing Route
router.get("/", Home); // Home Route
router.get("/List/:id", getListingById); // Get Listing Route
router.delete("/List/:id", deleteListing); // Delete Listing Route
router.put("/:UserId/List/:id",upload.single('file'), updateListing); // Update Listing Route

module.exports = router;
