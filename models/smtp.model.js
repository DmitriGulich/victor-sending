const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SMTPSchema = new Schema({
    _userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    host: {
        type: String,
        required: [true, 'please enter host'],
        trim: true
    },
    port: {
        type: Number,
        required: [true, 'please enter port']
    },
    secure: {
        type: Boolean,
        required: [true, 'please enter secure'],
        default: false
    },
    proxy: {
        type: String,
        default: ''
    },
    user: {
        type: String,
        required: [true, 'please enter user'],
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    thread: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: "Please enter password",
        trim: true,
        maxLength: 100,
        minlength: 8
    },
    attachment: {
        type: String,
        default: ''
    },
    
});

module.exports = mongoose.model('SMTP', SMTPSchema);