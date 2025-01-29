const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// POST /register route with validations
app.post('/register', [
    // Validate and sanitize name
    body('name').notEmpty().withMessage('Name is required').trim().escape(),
    
    // Validate email
    body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),

    // Validate password
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

], (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Simulate saving user to a database here

    // Send success response
    res.status(200).json({ message: "Registration successful!" });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
