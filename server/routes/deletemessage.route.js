const express = require('express');
const Message = require('../Database/models/messages');

const router = express.Router();

router.delete('/:id', async (req,res)=>{
    try{
        const deleteMessage = await Message.findByIdAndRemove(req.params.id, req.body);

        res.status(200).json({
            status: 'success',
            msg: deleteMessage
        });
    }catch(err){
        res.status(500).json({
            status:'Failed',
            msg: err
        });
    }
})

module.exports = router;