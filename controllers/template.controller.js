const Template = require('../models/template.model');

exports.templates = async function(req, res) {
    try {
        const userId = req.user.id;

        const templates = await Template.find({_userId: userId});

        if(templates === null) {
            return res.status(404).json({
                status: 'empty',
                list: []
            });
        }

        return res.status(200).json({
            status: 'filled',
            list: templates
        });
    } catch (e) {
        return res.status(500).json({
            status: 'failed',
            msg: e.message
        });
    }
}

exports.getTemplate = async function(req, res) {
    try {
        const userId = req.user.id;
        const templateId = req.params.id;

        const template = await Template.findOne({
            _userId: userId,
            _id: templateId
        });

        if(template === null) {
            return res.status(204).json({
                status: 'success',
                template: null
            });
        }

        return res.status(200).json({
            status: 'success',
            template
        });

    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            msg: error.message
        });
    }
}

exports.createTemplate = async function(req, res) {
    try {
        const userId = req.user.id;

        const template = new Template({
            _userId: userId,
            name: req.body.name,
            content: req.body.content
        });


        const newTemplate = await template.save();

        if(newTemplate === null) {
            return res.status(403).json({
                status: 'failed',
                msg: 'Bad Request'
            });
        }

        return res.status(201).json({
            status: 'success',
            template: newTemplate
        });
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            msg: error.message
        });
    }
}

exports.updateTemplate = async function(req, res) {
    try {
        const userId = req.user.id;
        const templateId = req.params.id;

        const r = await Template.updateOne(
            {
                _userId: userId,
                _id: templateId
            },
            {
                name: req.body.name,
                content: req.body.content
            }
        );

        if(r.n === 0) {
            return res.status(404).json({
                status: 'failed',
                msg: 'cannot find matched template'
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

exports.deleteTemplate = async function(req, res) {
    try {
        const userId = req.user.id;
        const templateId = req.params.id;

        const r = await Template.deleteOne({_userId: userId, _id: templateId});

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

