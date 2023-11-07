const express = require('express');
const User = require('../Database/models/user');  // Import your User model
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if a user exists with the given email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid email or password'
            });
        }

        // Check if the input password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid email or password'
            });
        }
        
        // Send a success response
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            token: token
        });

    } catch (err) {
        console.error(err);

        // Send a failed response
        res.status(500).json({
            status: 'failed',
            message: 'An error occurred while processing your request'
        });
    }
});

module.exports = router;
