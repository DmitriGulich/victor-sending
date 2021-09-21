const List = require('../models/list.model');

exports.lists = async function(req, res) {
    try {
        const userId = req.user.id;

        const lists = await List.find({_userId: userId});

        if(lists === null) {
            return res.status(404).json({
                status: 'empty',
                list: []
            });
        }

        return res.status(200).json({
            status: 'filled',
            list: lists
        });
    } catch (e) {
        return res.status(500).json({
            status: 'failed',
            msg: e.message
        });
    }
}

exports.getList = async function(req, res) {
    try {
        const userId = req.user.id;
        const listId = req.params.id;

        const list = await List.findOne({
            _userId: userId,
            _id: listId
        });

        if(template === null) {
            return res.status(200).json({
                status: 'success',
                list: null
            });
        }

        return res.status(200).json({
            status: 'success',
            list
        });

    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            msg: error.message
        });
    }
}

exports.createList = async function(req, res) {
    try {
        const userId = req.user.id;

        const list = new List({
            _userId: userId,
            name: req.body.name,
            emails: req.body.emails
        });

        const newList = await list.save();

        if(newList === null) {
            return res.status(403).json({
                status: 'failed',
                msg: 'Bad Request'
            });
        }

        return res.status(201).json({
            status: 'success',
            list
        });
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            msg: error.message
        });
    }
}

exports.updateList = async function(req, res) {
    try {
        const userId = req.user.id;
        const listId = req.params.id;

        const r = await List.updateOne(
            {
                _userId: userId,
                _id: listId
            },
            {
                name: req.body.name,
                emails: req.body.emails
            }
        );

        if(r.n === 0) {
            return res.status(404).json({
                status: 'failed',
                msg: 'cannot find matched list'
            });
        }

        return res.status(200).json({
            status: 'success',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            msg: error.message
        });
    }
}

exports.deleteList = async function(req, res) {
    try {
        const userId = req.user.id;
        const listId = req.params.id;

        const r = await List.deleteOne({_userId: userId, _id: listId});

        if(r !== 1) {
            return res.status(404).json({
                status: 'failed',
                msg: 'Not found'
            });
        }

        return res.status(204).json({
            status: 'success'
        });

    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            msg: error.message
        });
    }
}

