const express = require("express");
const router = express.Router();
const { UsersInfo , UserListings , Contacts , deleteContact ,deleteUser } = require("../Controlers/AdminControler.js");

router.get("/Users",UsersInfo);
router.get("/User/Listings",UserListings);
router.get("/Contacts",Contacts);
router.delete("/Contacts/:id",deleteContact);
router.delete("/User/delete/:id",deleteUser);

module.exports =router;