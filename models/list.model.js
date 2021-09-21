const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    _userId: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    emails: [{
        type: String,
    }]
});

module.exports = mongoose.model('List', ListSchema);