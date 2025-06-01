import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
  updateProduct,
} from "../controllers/productController.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/imageUpload.js";

const productRoute = express.Router();

productRoute.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct,
);
productRoute.patch(
  "/edit/:id",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  updateProduct,
);
productRoute.post("/remove", adminAuth, removeProduct);
productRoute.post("/single", singleProduct);
productRoute.get("/list", listProducts);

export default productRoute;
