const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,  // It will be a reference to the User model
    ref: 'users',  // Assuming you have a User model
    required: true
  },
  price: {
    type: Number
  },
  city: {
    type: String
  },
});

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
