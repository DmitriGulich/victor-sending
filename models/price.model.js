const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PriceSchema = new Schema({
    item: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    modifier: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    modifiedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Price', PriceSchema);