import UserModel from "../models/User.js";

const addToCart = async (req, res) => {
  const { userId } = req;

  const { itemId, size } = req.body;
  try {
    const user = await UserModel.findById(userId);
    const { cartData } = user;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }

      // short
      //   cartData[itemId][size] =(cartData[itemId][size] || 0) +1
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;

      // short
      //   cartData[itemId] = { [size]: 1 };
    }

    await UserModel.findByIdAndUpdate(userId, { cartData });
    return res.status(200).json({
      success: true,
      message: "Product added to cart",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCart = async (req, res) => {
  const { userId } = req;
  const { itemId, size, quantity } = req.body;

  try {
    const user = await UserModel.findById(userId);
    const { cartData } = user;
    if (quantity === 0) {
      delete cartData[itemId][size];

      if (Object.keys(cartData[productId]).length === 0) {
        delete cartData[productId];
      }
    } else {
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
      cartData[itemId][size] = quantity;
    }
    await UserModel.findByIdAndUpdate(userId, { cartData });
    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserCart = async (req, res) => {
  const { userId } = req;
  try {
    const user = await UserModel.findById(userId);
    const { cartData } = user;
    return res.status(200).json({
      success: true,
      cartData,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addToCart, getUserCart, updateCart };

