const AsyncErrors = require("../middleware/AsyncErrors");
const Errorhandler = require("../utils/errorhandler");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = AsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount : req.body.amount,
        currency:"inr",
        metadata:{
            company:"Ecommerce",
        },
    });
    res.status(200).json({
        success:true,
        client_secret: myPayment.client_secret,
    });
});

exports.sendStripeApiKey = AsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success:true,
        StripeApiKey:process.env.STRIPE_API_KEY,
    });
});
