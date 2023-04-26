const stripe = require("stripe")(process.env.STRIPE_KEY);
const User = require("../models/User");
const OrderModel = require("../models/OrderModel");
const ProductModel = require("../models/ProductModel");
class PaymentController {
  async paymentProcess(req, res, next) {
    console.log("first paymentProcess ")
    const { cart, id } = req.body;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const orderData = cart.map((item) => {
      return {
        _id: item._id,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        userId: user._id,
      };
    });[]
    const customer = await stripe.customers.create({  // danamic //customer-create email,cart
      email: user.email,
      metadata: {
        cart: JSON.stringify(orderData),
      },
    });
    const session = await stripe.checkout.sessions.create({   //danamic sessions.create   line_item->cart , customer.id
      shipping_address_collection: {
        allowed_countries: ["PK", "IN", "BD"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
      ],
      line_items: cart.map((item) => {
        const percentage = item.discount / 100;
        let actualPrice = item.price - item.price * percentage;
        actualPrice = parseFloat(actualPrice);
        actualPrice = actualPrice * 100;
        actualPrice = actualPrice.toFixed(1);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount_decimal: actualPrice,
          },
          quantity: item.quantity,
        };
      }),
      payment_intent_data: {
        on_behalf_of: "acct_1MwMroCw2vgrsKGI",
        application_fee_amount: Math.round((100).toFixed(2) * 100),
        transfer_data: {
          destination: "acct_1MwMroCw2vgrsKGI",
        },
      },
      customer: customer.id,
      mode: "payment",
      success_url: `${process.env.CLIENT}/user?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT}/cart`,
    });

    // new work

   
    res.json({ url: session.url });
  }
  async checkOutSession(request, response) {
    console.log("1 kxk bhi")
    const sig = request.headers["stripe-signature"];
    let event;
    try {
      console.log("2")
      event = stripe.webhooks.constructEvent(
        request.rawBody,
        sig,
        process.env.ENDPOINTSECRET
      );
      console.log("payment success");
    } catch (err) {
      console.log("3")
      console.log(err.message);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log("4")

        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      case "checkout.session.completed":
        const data = event.data.object;
        console.log("5")
        let customer = await stripe.customers.retrieve(data.customer);
        customer = JSON.parse(customer?.metadata?.cart);
        customer.forEach(async (ctr) => {
          try {
            let reviewStatus = false;
            console.log("6")
            const findOrder = await OrderModel.findOne({
              productId: ctr._id,
              userId: ctr.userId,
            })
              .where("review")
              .equals(true);
            if (findOrder) {
              reviewStatus = true;
            }
            await OrderModel.create({
              productId: ctr._id,
              userId: ctr.userId,
              size: ctr.size,
              color: ctr.color,
              quantities: ctr.quantity,
              address: data.customer_details.address,
              review: reviewStatus,
            });
            console.log("findOrder",findOrder)
            const product = await ProductModel.findOne({ _id: ctr._id });
            if (product) {
              let stock = product.stock - ctr.quantity;
              if (stock < 0) {
                stock = 0;
              }
              await ProductModel.findByIdAndUpdate(
                ctr._id,
                { stock },
                { new: true }
              );
            }
          } catch (error) {
            console.log("7")
            console.log(error.message);
            return response.status(500).json("Server internal error");
          }
        });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
  async paymentVerify(req, res) { //danamic id  
    console.log("third paymentVerify ")
    const { id } = req.params;
    try {
      const session = await stripe.checkout.sessions.retrieve(id);
      return res.status(200).json({
        msg: "Your payment has verfied successfully",
        status: session.payment_status,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}
module.exports = new PaymentController();