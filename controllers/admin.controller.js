const User = require('../models/user.model');

exports.getUsers = async (req, res) => {
    try {
        // get
        const users = await User.find().select('-password -__v -confirmationCode');

        return res.status(200).json({
            users
        })

    } catch (error) {
        return res.status(403).json({
            status: 'failed'
        });
    }
}