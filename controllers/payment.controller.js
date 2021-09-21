const Coinpayments = require('coinpayments');
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const { verify } = require('coinpayments-ipn');
const CoinpaymentsIPNError = require('coinpayments-ipn/lib/error');

const Transaction = require('../models/transaction.model');
const Plan = require('../models/plan.model');


const client = new Coinpayments({
    key: process.env.COIN_KEY,
    secret: process.env.COIN_SECRET
});

//  test coin payments. 

exports.coinpyamentsTest = async function(req, res) {
    try {
        const result = await client.getBasicInfo();
        return res.status(200).json({
            status: 'success',
            result
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            msg: error.message
        });
    }
}

exports.stripeCheckout = async function(req, res) {
    console.log("stripe-routes.js 9 | route reached", req.body);
    let { amount, id } = req.body;
    console.log("stripe-routes.js 10 | amount and id", amount, id);
    try {
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "USD",
            description: "Your Company Description",
            payment_method: id,
            confirm: true,
        });
        
        console.log("stripe-routes.js 19 | payment", payment);
        res.json({
            message: "Payment Successful",
            success: true,
        });
    } catch (error) {
        console.log("stripe-routes.js 17 | error", error);
        res.json({
            message: "Payment Failed",
            success: false,
        });
    }
}


exports.paypalIpn = function(req, res) {

}

exports.coinIpn = async function(req, res) {
    try {
        const txId = req.params.id;
        const payload = req.body;
        const hmac = req.headers.HTTP_HMAC;
        const ipnSecret = process.env.COIN_SECRET;

        console.log(req.headers);
        console.log(req.body);
        console.log(txId);

        let isValid, error;
 
        try {
            isValid = verify(hmac, ipnSecret, payload);
        } catch (e) {
            error = e;
            return;
        }
        if (error) {
            if (error instanceof CoinpaymentsIPNError) {
                // handle invalid payload
                return res.status(400);
            }
            // make bug report
            return res.status(400);
        }
         
        if (isValid) {
            // valid
            console.log('validated');
            return res.status(200);
        } else {
            // invalid
            console.log('invalid');
            return res.status(400);
        }
         

    } catch (error) {
        return res.status(500);
    }
}

exports.getCoinAddress = async function(req, res) {
    try {
        const userId = req.user.id;
        const planId = req.body.planId;

        // get and check plan
        const plan = await Plan.findOne({_id: planId});

        if(plan === null) {
            return res.status(400).json({
                status: 'failed',
                msg: 'Cannot find the plan'
            });
        }
        
        // create new Transaction and check
        const tx = new Transaction({
            _userId: userId,
            amount: plan.amount,
            currency1: 'BTC',
        });

        const newTx = await tx.save();

        console.log(newTx);

        if(newTx === null) {
            return res.status(400).json({
                status: 'failed',
                msg: 'cannot create transaction'
            });
        }

        // get callback address
        const addr = await client.getCallbackAddress({
            currency: newTx.currency1,
            ipn_url: `${process.env.ipn_url}/${newTx._id}`
        });

        return res.status(200).json({
            status: 'success',
            addr
        });

    } catch (error) {
        
    }
}
