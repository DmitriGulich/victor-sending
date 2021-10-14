const User = require('../models/user.model');

exports.users = async function(req, res) {
    
    User.find({}, (err, users) => {
        if(err) {
            return res.status(200).json({
                status: 'failed',
                msg: err
            });
        }

        return res.status(200).json({
            status: 'success',
            msg: users
        });

    });

}

exports.getUserById = async function(req, res) {
    try {
        const user = await User.findOne({_id: req.user.id});

        if(user === null) {
            return res.status(404).json({
                status: 'failed',
                msg: 'No found user'
            });
        }

        if(user.status === 'Pending') {
            return res.status(403).json({
                status: 'failed',
                msg: 'please activate your account'
            });
        }

        return res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            free: user.freeCount,
            counter: user.counter,
            endDate: user.endDate
        });

    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            msg: 'Server error'
        });
    }
}
