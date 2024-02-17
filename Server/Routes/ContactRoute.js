const express = require("express");
const router = express.Router();
const { contact } = require("../Controlers/ContactControler");

router.post("/", contact); // Contact Route

module.exports = router;



