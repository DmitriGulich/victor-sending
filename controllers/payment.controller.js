const stripe = require('stripe')('sk-test-key');

exports.stripeCheckout = async function(req, res) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: [
            'card',
        ],
        line_items: [
            {
                price: '',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: ``,
        cancel_url: ''
    });

    res.redirect(303, session.url);
}


exports.paypalIpn = function(req, res) {

}

exports.stripeIpn = function(req, res) {

}

exports.coinIpn = function(req, res) {

}

