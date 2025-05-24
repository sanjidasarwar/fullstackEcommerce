import Order from "../models/Order.js";
import User from "../models/User.js";

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
const placeOrderStripe = async (req, res) => {};
// placing orders using razorpay Method
const placeOrderRazorpay = async (req, res) => {};

// all orders data for admin panel
const allOrders = async (req, res) => {};

// user orders data for frontend
const userOrders = async (req, res) => {};

// update order status from admin panel
const updateStatus = async (req, res) => {};

export {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateStatus,
  userOrders
};

