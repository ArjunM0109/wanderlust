// Importing required modules
require("dotenv").config();
const express = require("express");
const connectDb = require("./DB/connection");
const cors = require("cors");
const ErrorMiddle = require("./Middlewares/ErrorMiddleware");
// Importing route modules
const ListingRoute = require("./Routes/ListingsRoute");
const ReviewRoute = require("./Routes/ReviewRoute");
const UserRoute = require("./Routes/UserRoute");
const ContactRoute = require("./Routes/ContactRoute");
const AdminRoute = require("./Routes/AdminRoute");
// Configuring CORS options
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, DELETE, PUT, HEAD, PATCH",
    credentials: true,
};

// Creating an instance of Express application
const app = express();

// Applying CORS middleware with the defined options
app.use(cors(corsOptions));

// Parsing JSON bodies
app.use(express.json());

// Mounting route handlers
app.use("/Listings", ListingRoute);
app.use("/Review", ReviewRoute);
app.use("/User", UserRoute);
app.use("/Contact",ContactRoute);
app.use("/Admin",AdminRoute);

app.use(ErrorMiddle);

// Establishing connection to the database and starting the server
connectDb().then(() => {
    app.listen(3030, () => {
        console.log("Server is running on port 3030");
    });
});
