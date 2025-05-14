import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return req.json({
        success: false,
        message: "Not authorized login again",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (
      decodedToken.email !== process.env.ADMIN_EMAIL ||
      decodedToken.password !== process.env.ADMIN_PASSWORD
    ) {
      return req.json({
        success: false,
        message: "Not authorized login again",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    req.status(500).json({ success: false, message: error.message });
  }
};

export default adminAuth;
