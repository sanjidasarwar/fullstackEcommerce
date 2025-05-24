import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/mongodb.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoutes.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();
connectDB();
connectCloudinary();

const port = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));

// api endpoint
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);

app.get("/", (req, res) => {
  res.send("Api working");
});

app.listen(port, () => {
  console.log(`listing to port ${port}`);
});
