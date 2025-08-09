// utils/validation.js
const validator = require('validator');

// Signup validation
const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) { 
        throw new Error("Name is not valid");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    }
};

// Edit profile validation
const validateEditProfileData = (req) => {
    const allowedFields = ["firstName", "lastName", "age", "gender", "about", "skills", "photoUrl"];
    const isEditAllowed = Object.keys(req.body).every(field => allowedFields.includes(field));

    if (!isEditAllowed) {
        throw new Error("Invalid fields in edit request");
    }

    if (req.body.firstName && req.body.firstName.length < 2) {
        throw new Error("First name must be at least 2 characters long");
    }

    if (req.body.lastName && req.body.lastName.length < 2) {
        throw new Error("Last name must be at least 2 characters long");
    }

    if (req.body.age && (req.body.age < 18 || req.body.age > 100)) {
        throw new Error("Age must be between 18 and 100");
    }

    if (req.body.gender && !["male", "female", "other"].includes(req.body.gender.toLowerCase())) {
        throw new Error("Gender must be Male, Female, or Other");
    }

    if (req.body.photoUrl && !validator.isURL(req.body.photoUrl)) {
        throw new Error("Invalid Photo URL");
    }

    return true;
};

module.exports = { validateSignUpData, validateEditProfileData };
