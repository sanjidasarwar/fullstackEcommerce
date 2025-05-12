import bycript from "bcrypt"
import validator from "validator"
import User from "../models/User.js"

// route for login
const loginUser = async (req, res) =>{

}

const loginAdmin = async (req, res, next) =>{


}

// route for register

const registerUser = async (req, res) =>{
    try {
        const {name, email, password} = req.body
        const exists = await UserModel.findOne({email:email})
        if(exists){
            return res.json({
                success:false,
                message: 'User already exist'
            })
        }

        if(!validator.isEmail()){
            return res.status(500).json({
                success: false,
                message: 'Please enter a valid email.'
            })
        }

        const strongPassword = validator.isStrongPassword(password,{
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })

        if(!strongPassword){
            return res.status(500).json({
                success: false,
                message: 'Please enter a strong password.'
            })
        }

        // hashing password
        const hashedPassword = await bycript.hash(password, 10)

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        const user = newUser.save()

        res.status(200).json({
            message: "User was added successfully!",
            user
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}

export {
    loginAdmin, loginUser,
    registerUser
}

