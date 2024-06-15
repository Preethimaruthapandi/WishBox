const mongoose = require('mongoose');

const WishSchema = new mongoose.Schema({
    wish: String,
    fulfilled: {
        type: Boolean,
        default: false
    }
});

const WishModel = mongoose.model('wishes', WishSchema);
module.exports = WishModel;
