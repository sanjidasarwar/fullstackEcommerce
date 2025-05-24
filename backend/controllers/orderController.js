// placing orders using COD Method
const placeOrder = async (req, res) => {};

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

