const User = require('../models/user.model');
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require('../utils/mail');
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
            password: req.body.password,
            confirmationCode: crypto.randomBytes(16).toString('hex')
        });
        const newUser = await user.save();
        const username = newUser.firstName + ' ' + newUser.lastName;

        // send verify Email
        const mailOptions = { 
            from: process.env.USER_EMAIL, 
            to: newUser.email, 
            subject: 'Account Verification Token', 
            html: `<h1>Email Confirmation</h1>
            <h2>Hello ${username}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href=https://sheltered-refuge-91847.herokuapp.com/verify/${newUser.confirmationCode}> Click here</a>
            </div>`
        };

        sendEmail(mailOptions);


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
        if(user.status !== 'Active') {
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
        const token = req.params.token;
        let user = await User.findOne({confirmationCode: token});

        if(user === null) {
            return res.status(404).json({ 
                status: 'failed',
                msg: 'No user'
            });
        }

        user.status = 'Active';
        await user.save();

        return res.status(200).json({
            status: 'success'
        });

    } catch (error) {
        return res.status(403).json({ 
            status: 'failed',
            msg: 'unauthorized'
        });
    }
}

exports.resend = async (req, res) => {
    // check user
    const {email, username} = req.body;
    const user = User.findOne({email});

    if(user === null) {
        return res.status(404).json({ 
            status: 'failed',
            msg: 'No user'
        });
    }

    // check verify status
    if(user.status === 'Active'){
        return res.status(200).json({
            status: 'success',
            msg: 'already activated'
        });
    }

    // send email
    const mailOptions = { 
        from: process.env.USER_EMAIL, 
        to: email, 
        subject: 'Account Verification Token', 
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${username}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=https://sheltered-refuge-91847.herokuapp.com/verify/${user.confirmationCode}> Click here</a>
        </div>`
    };

    sendEmail(mailOptions);
}