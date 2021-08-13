const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define User Schema

const UserSchema = new Schema({
    firstName: {
        type: String,
        minlength: [3, "name is too short"],
        required: "Please enter name"
    },
    lastName: {
        type: String,
        minlength: [3, 'name is too short'],
        required: 'Please enter last name'
    },
    email: {
        type: String,
        required: "Please enter your email",
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: "Please enter password",
        trim: true,
        maxLength: 100,
        minlength: 8
    },
    status: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    confirmationCode: { 
        type: String, 
        unique: true 
    },
    expired: {
        type: Date
    },
    phone: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ['premium', 'guest', 'admin'],
        default: 'guest'
    },
    endDate: {
        type: Date,
        default: null
    },
    freeCount: {
        type: Number,
        default: 100
    },
    counter: {
        type: Number,
        default: 0
    }
});

UserSchema.pre('save', function(next){
    // if(!this.isModified('password')){
    //     return next();
    // }

    bcrypt.genSalt(10, (err, salt) => {

        if(err) {
            return next(err);
        }

        bcrypt.hash(this.password, salt, (error, hash) => {
            if(error){
                return next(error);
            }
            this.password = hash;
            next();
        });
    })
});

UserSchema.methods.checkPassword = (password) => {
    const passwordHash = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, same) => {
            if(err){
                return reject(err);
            }

            resolve(same);
        });
    });
}

module.exports = mongoose.model('User', UserSchema);