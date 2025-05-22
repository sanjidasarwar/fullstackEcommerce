import express from "express";
import {
    addToCart,
    getUserCart,
    updateCart,
} from "../controllers/cartController.js";

import userAuth from "../middleware/userAuth.js";

const cartRoute = express.Router();

cartRoute.post("/add", userAuth, addToCart);
cartRoute.post("/update", userAuth, updateCart);
cartRoute.post("/get", userAuth, getUserCart);

export default cartRoute;
