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

const allowedOrigins = [
  "https://ecommerce-frontend-seven-wine.vercel.app",
  "https://ecommerce-admin-yourproject.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
];

// middlewares
// app.use(cors());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// api endpoint
app.use("user", userRoute);
app.use("product", productRoute);
app.use("cart", cartRoute);
app.use("order", orderRoute);

app.get("/", (req, res) => {
  res.send("Api working");
});

app.listen(port, () => {
  console.log(`listing to port ${port}`);
});
