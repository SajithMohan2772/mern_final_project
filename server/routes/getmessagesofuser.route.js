const express = require('express');
const Message = require('../Database/models/messages');
const { authenticate } = require('../Middleware/auth');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
    try {
        const user = req.user; // This comes from the authenticate middleware
        const message = await Message.find({ userId: user._id }); // Assuming the Message schema has a userId field that links to the user's ID

        if (message.length === 0) {
            return res.status(404).json({
                status: 'Failed',
                message: 'No message found for the user'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                messages: message
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
});

module.exports = router;
