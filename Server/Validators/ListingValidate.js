const { z } = require("zod");

const listingValidate = z.object({
    title: z.string({ required_error: "Title is required" })
        .trim()
        .min(3, { message: "Title must be at least 3 characters." })
        .max(100, { message: "Title must not be more than 20 characters." }),

    description: z.string({ required_error: "Description is required" })
        .trim()
        .min(3, { message: "Description must be at least 3 characters." })
        .max(200, { message: "Description must not be more than 200 characters." }),

    location: z.string({ required_error: "Location is required" })
        .trim()
        .min(3, { message: "Location must be at least 3 characters." })
        .max(20, { message: "Location must not be more than 20 characters." }),

    country: z.string({ required_error: "Country name is required" })
        .trim()
        .min(3, { message: "Country must be at least 3 characters." })
        .max(20, { message: "Country must not be more than 20 characters." }),

    price: z.number({ required_error: "Price is required" })
        .min(1000, { message: "Price must be at least 1000" })
});

module.exports = listingValidate;
