const express = require("express");
const router = express.Router();
const { login , registration , userInfo } = require("../Controlers/UserControler.js");

// Importing Middleware
const {SignUpSchema , SignInSchem} = require("../Validators/UserValidate");
const validate = require("../Middlewares/ValidateMiddleware");
const jwtCheck = require("../Middlewares/jwtCheck.js");

router.post("/Registration",validate(SignUpSchema),registration); // New User Registration Route
router.post("/Login" ,validate(SignInSchem), login); //  User Login Route

router.get("/UserInfo",jwtCheck,userInfo);// user token verify
module.exports = router; 

 