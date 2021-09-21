const Plan = require('../models/plan.model');

exports.plans = async function(req, res) {
    try {
        const plans = await Plan.find();

        if(plans === null) {
            return res.status(404).json({
                status: 'empty',
            });
        }

        return res.status(200).json({
            status: 'success',
            list: plans
        });
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            msg: error.message
        });
    }
}

exports.createPlan = async function(req, res) {
    try {
        const plan = new Plan({
            name: req.body.name,
            amount: req.body.amount,
            type: req.body.type
        });


        const newPlan = await plan.save();

        if(newPlan === null) {
            return res.status(403).json({
                status: 'failed',
                msg: 'Bad Request'
            });
        }

        return res.status(201).json({
            status: 'success',
            plan: newPlan
        });
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            msg: error.message
        });
    }
}

exports.updatePlan = async function(req, res) {
    try {
        const planId = req.params.id;

        const r = await Plan.updateOne(
            {
                _id: planId
            },
            {
                name: req.body.name,
                amount: req.body.amount,
                type: req.body.type
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

exports.deletePlan = async function(req, res) {
    try {
        const planId = req.params.id;

        const r = await Plan.deleteOne({_id: planId});

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