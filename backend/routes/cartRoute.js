import express from "express";
import {
    addToCart,
    getUserCart,
    updateCart,
} from "../controllers/cartController";

const cartRoute = express.Router();

cartRoute.post("/add", addToCart);
cartRoute.post("/update", updateCart);
cartRoute.post("/get", getUserCart);

export default cartRoute;
