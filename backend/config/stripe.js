const  Stripe=require('stripe')
const stripe=Stripe(process.env.Stripe_SECRET_KEY)
module.exports=stripe