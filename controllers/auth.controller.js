const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyToken } = require('../utils/jwt');

exports.register = async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email});
        if (user) return res.status(400).send({ 
                status: 'failed',
                msg: {
                    errors: {
                        email: {
                            path: 'email',
                            message: 'The email is already associated with another account.' 
                        }
                    }
                }
        });
    
        user = new User({
            firstName: req.body.firstName,    
            lastName: req.body.lastName, 
            phone: req.body.phone,   
            email: req.body.email,    
            password: req.body.password
        });
        const newUser = await user.save();

        // send verify Email

        // end of sending email

        res.status(201).json({
            status: 'success',
            msg: 'verify'
        });


    } catch (error) {
        return res.status(400).json({
            status: 'failed',
            msg: error
        });
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if(!user) {
            return res.status(400).json({
                status: "error",
                msg: "No user"
            });
        } 

        // check verify 
        if(!user.isEmailVerified) {
            return res.status(401).json({
                status: 'failed',
                msg: 'verify'
            });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) return res.status(400).json({
            status: 'login failed',
            msg: 'unauthorized'
        });
        
        const token = jwt.sign(
            {
                _id: user._id,
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                iat: Math.floor(Date.now())
            }, 
            process.env.JWT_SECRET, 
        );

        return res.status(200).json({ 
            username: user.firstName + ' ' + user.lastName,
            email: user.email,
            accessToken: token,
            id: user._id    
        });
    } catch (error) {
        return res.status(403).json({ 
            status: 'failed',
            msg: 'unauthorized'
         });
    }
}

exports.emailVerify = async (req, res) => {
    try {
        let user = User.findOne({})
    } catch (error) {
        
    }
}

exports.resend = async (req, res) => {
    // check user

    // check verify status

    // send email
}