const Quota = require('../models/quota.model');

exports.quotas = async function(req, res) {
    try {
        const quotas = await Quota.find();

        if(quotas === null) {
            return res.status(404).json({
                status: 'empty',
            });
        }

        return res.status(200).json({
            status: 'success',
            list: quotas
        });
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            msg: error.message
        });
    }
}

exports.getQuota = async function(req, res) {
    try {
        const userId = req.user.id;
        const quotaId = req.params.id;

        const quota = await Quota.findOne({
            _userId: userId,
            _id: quotaId
        });

        if(quota === null) {
            return res.status(204).json({
                status: 'success',
                quota: null
            });
        }

        return res.status(200).json({
            status: 'success',
            quota
        });

    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            msg: error.message
        });
    }
}

exports.createQuota = async function(req, res) {
    try {
        const quota = new Quota({
            count: req.body.count,
            price: req.body.price,
        });


        const newQuota = await quota.save();

        if(newQuota === null) {
            return res.status(403).json({
                status: 'failed',
                msg: 'Bad Request'
            });
        }

        return res.status(201).json({
            status: 'success',
            quota: quota
        });
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            msg: error.message
        });
    }
}

exports.updateQuota = async function(req, res) {
    try {
        const quotaId = req.params.id;

        const r = await Quota.updateOne(
            {
                _id: quotaId
            },
            {
                count: req.body.count,
                price: req.body.price,
            }
        );

        if(r.n === 0) {
            return res.status(404).json({
                status: 'failed',
                msg: 'cannot find matched Plan'
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

exports.deleteQuota = async function(req, res) {
    try {
        const quotaId = req.params.id;

        const r = await Quota.deleteOne({_id: quotaId});

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