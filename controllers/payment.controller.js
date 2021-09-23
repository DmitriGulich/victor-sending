const Coinpayments = require('coinpayments');
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const { verify } = require('coinpayments-ipn');
const CoinpaymentsIPNError = require('coinpayments-ipn/lib/error');

const Transaction = require('../models/transaction.model');
const User = require('../models/user.model');

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
/**
 * IPN processing routine. 
 * In this routine receives the nofitication from Coinpayments,
 * and complete the transaction. 
 * Here I didn't compare original currency. 
 * Only BTC is accepted.
 * @param {request} req 
 * @param {response} res 
 * @returns none
 */
exports.coinIpn = async function(req, res) {
    try {
        const txId = req.params.id;
        const payload = req.body;
        const hmac = req.headers.hmac;
        const ipnSecret = process.env.IPN_SECRET;
        const merchantId = process.env.MERCHANT_ID;

        let isValid, error;

        const tx = await Transaction.findOne({_id: txId});
        
        if(tx === null) {
            return res.status(404).json({
                status: 'failed',
                msg: 'Cannot find the proper transaction.'
            });
        }

        try {
            isValid = verify(hmac, ipnSecret, payload);
        } catch (e) {
            error = e;
        }
        if (error) {
            if (error instanceof CoinpaymentsIPNError) {
                // handle invalid payload
                return res.status(400).json({
                    status: 'failed',
                    msg: 'invalid payload'
                });
            }
            // make bug report
            return res.status(400).json({});
        }
         
        if (isValid) {
            // valid
            if(payload.merchant !== merchantId) {
                return res.status(400).json({
                    status: 'failed',
                    msg: 'merchant_id does not match.'
                });
            }

            if(tx.amount > payload.amount1) {
                return res.status(400).json({
                    status: 'failed',
                    msg: 'Amount is less than order total!'
                });
            }

            if(payload.status === 2 || payload.status >= 100) {
                const newTx = await Transaction.updateOne({
                    _id: tx._id
                }, {
                    paidAt: Date.now(),
                    paidAmount: payload.amount1
                });

                if(newTx.type === 'premium') {
                    let d = new Date();
                    const year = d.getFullYear();
                    const month = d.getMonth();
                    const day = d.getDate();
                    const c = new Date(year + 1, month, day);
                    await User.updateOne({_id: newTx._userId}, {
                        role: 'premium',
                        endDate: c
                    });
                } else if ( newTx.type === 'guest' ) {
                    const user = await User.findOne({_id: newTx._userId})
                    await User.updateOne({_id: newTx._userId}, {
                        counter: user.counter + newTx.count
                    });
                }

                return res.status(200).json({
                    status: 'success',
                    transaction: newTx
                });
            }

        } else {
            // invalid
            return res.status(400).json({
                status: 'failed',
                msg: 'invalid payload'
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            msg: error.message
        });
    }
}

exports.getPremiumAddress = async function(req, res) {
    try {
        const userId = req.user.id;
        const amount = req.body.amount;

        if(amount <= 0) {
            return res.status(400).json({
                status: 'failed',
                msg: 'amount must be more than zero.'
            });
        }

        // create new Transaction and check
        const tx = new Transaction({
            _userId: userId,
            currency1: 'BTC',
            amount: amount,
            type: 'premium'
        });

        const newTx = await tx.save();
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
        return res.status(500).json({
            status: 'failed',
            msg: error.message
        });
    }
}

exports.getBillAddress = async function(req, res) {
    try {
        const userId = req.user.id;
        const quotaId = req.body.quotaId;

        const quota = await Quota.findOne({_id: quotaId});
        if(quota === null) {
            return res.status(404).json({
                status: 'failed',
                msg: 'cannot find quota'
            });
        }

        if(quota.price === 0 || quota.count === 0) {
            return res.status(404).json({
                status: 'failed',
                msg: 'invalid quota'
            });
        }

        // create new Transaction and check
        const tx = new Transaction({
            _userId: userId,
            currency1: 'BTC',
            amount: quota.price,
            count: quota.count,
            type: 'guest'
        });

        const newTx = await tx.save();
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
        return res.status(500).json({
            status: 'failed',
            msg: error.message
        });
    }
}