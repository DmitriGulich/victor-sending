const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    _userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    kind: {
        type: String,
        required: true,
        enum: ['guest', 'premium']
    },
    payType: {
        type: String,
        required: true,
        enum: ['paypal', 'stripe', 'coin']
    },
    payAt : {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Payment', PaymentSchema);