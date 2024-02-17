const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default:false
  }
});


 userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin : this.isAdmin
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn:"7d",
        }
        )
        
    } catch (error) {
        console.log(error);
    }
 }

 module.exports = mongoose.model('User', userSchema);
