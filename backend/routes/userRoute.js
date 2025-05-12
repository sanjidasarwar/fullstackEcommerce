import express from 'express';
import { loginAdmin, loginUser, registerUser } from "../controllers/userController.js";

const userRoute = express.Router()

userRoute.post('/login', loginUser);
userRoute.post('/register', registerUser)
userRoute.post('/admin', loginAdmin)

export default userRoute