const express = require('express');
const Message = require('../Database/models/messages');
const { authenticate } = require('../Middleware/auth');

const router = express.Router();

router.get('/user-message', authenticate, async (req, res) => {
    try {
        const user = req.user; 
        const message = await Message.findOne({ userId: user._id }); 

        if (!message) {
            return res.status(404).json({
                status: 'Failed',
                message: 'No message found for the user'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                message
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
