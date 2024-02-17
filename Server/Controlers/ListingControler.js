const Listing = require("../Models/ListingSchema");
const {storage} = require("../cloudConfig");
const Home = async (req, res) => {
    try{
    const result = await Listing.find({});
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


const addListing = async (req, res) => {
  const { UserId } = req.params;
  const { title, description, price, location, country } = req.body;

  try {
    const newListing = new Listing({
      title,
      description,
      price,
      location,
      country,
      owner: UserId // Assuming UserId is the owner of the listing
    });

    // Save the new listing to the database
    await newListing.save();

    res.status(201).json({ message: "Listing added successfully", newListing });
  } catch (error) {
    console.error('Error adding listing:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = addListing;





const getListingById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Listing.findById(id)
    .populate({ 
        path: 'reviews', 
        populate: {
            path: 'author' // Populating the 'author' field in the 'reviews' collection
        }
    })
    .populate({ 
        path: 'owner', 
        select: '-password' // Selecting all fields from 'owner' except 'password'
    });

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

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

const updateListing = async (req, res) => {
  const { id ,UserId } = req.params;
  const { title, description, price, image, location } = req.body;
  try {
    const listing = await Listing.findById(id);
    if(!listing.owner._id.equals(UserId)){
        res.send({message:"you dont have permission to delete"});
    }
    if (!updatedListing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.status(200).json(updatedListing);
  } catch (error) {
    console.error('Error updating listing:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const AllData = async (req, res) => {
    try {
      const countsByLocation = await Listing.aggregate([
        {
          $group: {
            _id: "$location",
            count: { $sum: 1 }
          }
        }
      ]);
      const totalListingCount = await Listing.countDocuments();
  
      res.json({ total: totalListingCount, countsByLocation });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  

module.exports = { Home , addListing , getListingById , deleteListing , updateListing , AllData };
