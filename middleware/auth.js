const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.protect = async (req, res, next) => {
    // 1) get token
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined'){
        return res.status(401).json({
            status: 'fail',
            message: 'please login'
        });
    } 

    const token = bearerHeader.split(' ')[1];

    try {
        // 2) token verification
        const authData = await jwt.verify(token, process.env.JWT_SECRET);

        // 3) check user
        const user = await User.findOne({_id: authData._id});

        if(!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'cannot find user'
            });
        }
        
        req.user = user;
        next();
        // 4) password modify


    } catch (err) {
        return res.status(401).json({
            status: 'fail',
            message: 'unauthorized: ' + err.message
        })
    }
}

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                status: 'fail',
                message: 'you have no permission'
            });
        }
        next();
    }
}