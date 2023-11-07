const express = require('express');
const Message = require('../Database/models/messages');
const { authenticate, authorize } = require('../Middleware/auth'); // Adjust the path accordingly


const router = express.Router();

router.get('/', authenticate, authorize('admin'), async (req, res) => {
    const messages = await Message.find({})
    try{
        res.status(200).json({
            status:'success',
            data:{
                messages
            }
        })
    }catch(err){
        res.status(500).json({
            status:'Failed',
            message: err
    })
    }
})

module.exports = router