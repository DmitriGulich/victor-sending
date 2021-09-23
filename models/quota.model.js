const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuotaSchema = new Schema({
    count: {
        type: Number, 
        default: 0
    },
    price: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Quota', QuotaSchema);