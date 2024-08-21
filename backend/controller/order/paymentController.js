const stripe=require('../../config/stripe')

const paymentController=async(req,res)=>{
    try {
  const {cartItems}=req.body


   const user=await userModel.findOne({_id:req.userId})


   const params = {
     submit_type: "pay",
     mode: "payment",
     payment_method_types: ["card"],
     billing_address_collection: "auto",
     shipping_options: [
       {
         shipping_rate: "shr_1PmvScJTYxwhdmvwJ1nhe8iF",
       },
     ],
     customer_email:user.email,
     line_items:cartItems.map((item,index)=>{
return{
    price_data:{
        currency:'inr',
        product_data:{

        }
    }
}
     })
   };



  const session= await stripe.checkout.sessions.create()
   res.status(303).json(session)

        
    } catch (error) {
         res.json({
           message: error?.message || err,
           error: true,
           success: false,
         });
    }
}
module.exports = paymentController;