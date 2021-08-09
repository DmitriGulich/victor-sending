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
    
}
