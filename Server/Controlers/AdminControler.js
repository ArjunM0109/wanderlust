const User = require("../Models/UserSchema");
const Contact = require("../Models/ContactSchema");

const UsersInfo = async (req, res) => {
    try {
        const Users = await User.find({}, {password: 0});
        if (!Users || Users.length === 0) {
            return res.status(404).json({ message: "No User Found" });
        }
        res.status(200).json(Users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


const UserListings = async(req,res)=>{

}

const Contacts = async(req,res)=>{
    try {
        const contacts =  await Contact.find({});
        if(!contacts || Contacts.length === 0){
            res.status(404).json({message:"No Contact Found"});
        }
        res.status(200).json(contacts);
    } catch (error) {
        console.log(error);
    }
}

const deleteContact = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedContact = await Contact.findByIdAndDelete(id);
      if (!deletedContact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.status(200).json({ message: "Contact deleted successfully", deletedContact });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      // Delete user reviews
      await Review.deleteMany({ author: id });
      
      // Delete listings associated with the user
      const deletedListings = await Listing.deleteMany({ owner: id });
  
      // Delete the user
      const deletedUser = await User.findByIdAndDelete(id);
  
      res.json({ message: "User deleted successfully", deletedListings });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  

module.exports = { UsersInfo , UserListings , Contacts ,deleteContact ,deleteUser};
