import cors from "cors";
import "dotenv/config";
import express from "express";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/mongodb.js";

const app = express();
connectDB()
connectCloudinary()

const port = process.env.PORT || 8000

// middlewares
app.use(express.json());
app.use(cors());

// api endpoint
app.get('/', (req, res)=>{
    res.send('Api working')
})

app.listen(port, ()=>{
    console.log(`listing to port ${port}`);
    
})

