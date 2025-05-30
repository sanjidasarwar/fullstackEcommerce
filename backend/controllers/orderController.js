import Stripe from "stripe";
import Order from "../models/Order.js";
import User from "../models/User.js";

// global variable
const currency = "usd";
const delivery_fee = 100;

//stripe intigration
const stripe = new Stripe(process.env.STRIPE_SECRET);

// placing orders using COD Method
const placeOrder = async (req, res) => {
  const { userId } = req;
  const { items, amount, address } = req.body;
  try {
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "cod",
      payment: false,
      date: Date.now(),
    };

    const newOrder = await new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.status(200).json({
      success: true,
      message: "Placed Order Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: falses,
      message: error.message,
    });
  }
};

// placing orders using stripe Method
const placeOrderStripe = async (req, res) => {
  const { userId } = req;
  const { items, amount, address } = req.body;
  const { origin } = req.headers;

  try {
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = await new Order(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Fee",
        },
        unit_amount: delivery_fee * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/varify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/varify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// varify stripe payment
const varifyStripe = async (req, res) => {
  const { userId } = req;
  const { success, orderId } = req.body;

  try {
    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      await User.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// all orders data for admin panel
const allOrders = async (req, res) => {
  try {
    const allOrdersList = await Order.find({});

    res.status(200).json({
      success: true,
      allOrdersList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// user orders data for frontend
const userOrders = async (req, res) => {
  const { userId } = req;
  try {
    const orders = await Order.find({ userId });
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// update order status from admin panel
const updateStatus = async (req, res) => {
  try {
    const { status, orderId } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  allOrders,
  placeOrder,
  placeOrderStripe,
  updateStatus,
  userOrders,
  varifyStripe
};

