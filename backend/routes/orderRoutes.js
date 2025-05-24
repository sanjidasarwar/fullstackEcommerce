import express from "express";
import {
    allOrders,
    placeOrder,
    placeOrderRazorpay,
    placeOrderStripe,
    updateStatus,
    userOrders,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/userAuth.js";

const orderRoute = express.Router();

// admin features
orderRoute.get("/list", adminAuth, allOrders);
orderRoute.post("/status", adminAuth, updateStatus);

// payment features
orderRoute.post("/place", userAuth, placeOrder);
orderRoute.post("/stripe", userAuth, placeOrderStripe);
orderRoute.post("/razorpay", userAuth, placeOrderRazorpay);

// user features
orderRoute.get("/userOrders", userAuth, userOrders);

export default orderRoute;
