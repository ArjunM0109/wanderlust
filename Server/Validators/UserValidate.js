const { z } = require("zod");

const SignInSchem = z.object({
    email: z.string({ required_error: "email is required" })
    .email({ message: "Invalid Email" }),
    password: z.string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(10,{ message: "Password must not be more then 10 characters"})
});

const SignUpSchema = z.object({
    name: z.string({ required_error: "name is required" })
        .trim()
        .min(3, { message: "Name must be at least 3 characters" })
        .max(10, { message: "Name must not be more than 10 characters" }),

    email: z.string({ required_error: "email is required" })
        .email({ message: "Invalid Email" }),

    phone: z.string({ required_error: "Phone number is required" })
        .min(10, { message: "Phone number must be 10 digits" })
        .max(10, { message: "Phone number must not be more than 10 digits" }),

    password: z.string({ required_error: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters" })
        .max(10,{ message: "Password must not be more then 10 characters"})
});

module.exports = { SignUpSchema , SignInSchem };
