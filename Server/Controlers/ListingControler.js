const Listing = require("../Models/ListingSchema");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUDE_API_SECRET
});

const Home = async (req, res) => {
  try {
    const result = await Listing.find({});
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addListing = async (req, res) => {
  const { UserId } = req.params;
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'UserImages'
    });

    const imageUrl = result.secure_url;
    console.log('Image uploaded to Cloudinary:', imageUrl);

    const { title, description, price, location, country } = req.body;
    
    try {
      const newListing = new Listing({ 
        title, 
        description, 
        imageUrl,
        price, 
        location, 
        country,
        owner: UserId // Assuming UserId is the owner of the listing
      });
      await newListing.save();
      console.log("Listing created successfully");
      res.status(201).json({ message: 'Image uploaded and listing created successfully', listing: newListing });
    } catch (error) {
      console.error("Error creating listing:", error);
      res.status(500).json({ error: "Failed to create listing" });
    }
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

const getListingById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Listing.findById(id)
      .populate({
        path: 'reviews',
        populate: {
          path: 'author'
        }
      })
      .populate({ 
        path: 'owner', 
        select: '-password' // Selecting all fields from 'owner' except 'password'
    });

    if (!data) {
      return res.status(404).json({ error: "Listing not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}; 

 const updateListing = async (req, res) => {
  
  const { id, UserId } = req.params;
  console.log(UserId);
  console.log(req.file);
  const { title, description, price, location, country } = req.body;
  let updatedListingData = {
    title,
    description,
    price,
    location,
    country
  };

  try {
    let updatedListing;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'UserImages'
      });
      updatedListingData.imageUrl = result.secure_url;
      console.log('Image uploaded to Cloudinary:', updatedListingData.imageUrl);
    }

    if (req.file) {
      updatedListing = await Listing.findByIdAndUpdate(
        id,
        { $set: updatedListingData },
        { new: true }
      );
    } else {
      updatedListing = await Listing.findByIdAndUpdate(
        id,
        { $set: updatedListingData }
      );
    }

    if (!updatedListing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    res.status(200).json({ message: "Listing updated successfully", listing: updatedListing });
  } catch (error) {
    console.error('Error updating listing:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteListing = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


module.exports = { Home, addListing, getListingById, deleteListing, updateListing  };
