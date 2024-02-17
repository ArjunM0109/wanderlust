const User = require("../Models/UserSchema");
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const registration = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const userExist = await User.findOne({ email });
        
        if (userExist) {
            return res.status(400).json({ message: "User Already Exists" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, phone, password: hashedPassword });
        const userCreated = await newUser.save();
        
        res.status(200).json({
            message: 'User registered successfully.',
            Token: await userCreated.generateToken(),
            userId: userCreated._id.toString()
        });
    } catch (error) {
        console.error('Registration error:', error);
        if (error.errors) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(404).json({ message: "Invalid Credentials" });
        }

        const match = await bcrypt.compare(password, userExist.password);
        if (!match) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        res.status(200).json({ 
            message: "Login successful",
            token: await userExist.generateToken(), // Corrected typo here
            userId: userExist._id.toString(),
        });
    } catch (error) {
        console.error("Login error:", error);
        if (error.errors) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        res.status(500).json({ error: "Internal server error" });
    }
};

const userInfo = async(req,res,next)=>{
    try {
        const userData = req.user;
        return res.status(200).json({userData});
    } catch (error) {
        console.log("userInfo:",error);
    }
}

module.exports = { registration, login, userInfo };
