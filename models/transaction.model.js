const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    _userId: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    count: {
        type: Number
    },
    currency1: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    paidAt: {
        type: Date
    },
    paidAmount: {
        type: Number
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);