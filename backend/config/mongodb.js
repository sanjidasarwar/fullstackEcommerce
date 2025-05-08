import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
      console.log(process.env.MONGODB_URI);
      
        await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`);
        console.log("MongoDB connected");
      } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
      }
}

export default connectDB;