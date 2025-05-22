import bycript from "bcrypt";
import validator from "validator";
import User from "../models/User.js";
import createToken from "../utilities/createToken.js";

// route for login
const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.userName }, { name: req.body.userName }],
    });

    if (!user) {
      res.status(500).json({
        success: false,
        message: "Please enter a valid Name/Email",
      });
    }

    const validPassword = await bycript.compare(
      req.body.password,
      user.password,
    );
    if (!validPassword) {
      res.status(500).json({
        success: false,
        message: "Please enter a valid password",
      });
    }
    const userObj = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    const token = createToken(userObj);

    return res.status(200).json({
      success: true,
      message: "Login Sucessful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginAdmin = (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const adminObj = {
        email,
        password,
      };

      const token = createToken(adminObj);
      res.status(200).json({
        success: true,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// route for register

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    const exists = await User.findOne({ email: email });
    if (exists) {
      return res.json({
        success: false,
        message: "User already exist",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(500).json({
        success: false,
        message: "Please enter a valid email.",
      });
    }

    const strongPassword = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });

    if (!strongPassword) {
      return res.status(500).json({
        success: false,
        message: "Please enter a strong password.",
      });
    }

    // hashing password
    const hashedPassword = await bycript.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const user = newUser.save();

    return res.status(200).json({
      message: "User was added successfully!",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error => ${error.message}`,
    });
  }
};

export { loginAdmin, loginUser, registerUser };

