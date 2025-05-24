import express from "express";
import {
    allOrders,
    placeOrder,
    placeOrderRazorpay,
    placeOrderStripe,
    updateStatus,
    userOrders,
} from "../controllers/orderController";
import adminAuth from "../middleware/adminAuth";
import userAuth from "../middleware/userAuth";

const orderRoute = express.Router();

// admin features
orderRoute.get("/list", adminAuth, allOrders);
orderRoute.post("/status", adminAuth, updateStatus);

// payment features
orderRoute.post("/place", userAuth, placeOrder);
orderRoute.post("/stripe", userAuth, placeOrderStripe);
orderRoute.post("/razorpay", userAuth, placeOrderRazorpay);

// user features
orderRoute.post("/userOrders", userAuth, userOrders);

export default orderRoute;
