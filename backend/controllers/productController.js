import cloudinary from "cloudinary";
import ProductModel from "../models/Product.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    // if an image is not uploaded
    const images = [image1, image2, image3, image4].filter(
      (img) => img !== undefined,
    );

    const imageUrl = await Promise.all(
      images.map(async (img) => {
        const result = await cloudinary.uploader.upload(img.path, {
          resource_type: "image",
        });
        return {
          url: result.secure_url,
          public_id: result.public_id,
        };
      }),
    );

    const prodeuctData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true",
      date: Date.now(),
      image: imageUrl,
    };

    const newProduct = await new ProductModel(prodeuctData);
    await newProduct.save();

    res.status(200).json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    // if an image is not uploaded
    const newImages = [image1, image2, image3, image4].filter(
      (img) => img !== undefined,
    );

    let imageData = [];

    const existingProduct = await ProductModel.findById(req.params.id);

    // If new images are uploaded, delete old images from Cloudinary
    if (newImages.length > 0 && existingProduct.image.length > 0) {
      await Promise.all(
        existingProduct.image.map(async (img) => {
          if (img.public_id) {
            await cloudinary.uploader.destroy(img.public_id);
          }
        }),
      );

      // Upload new images and get public_id + url
      imageData = await Promise.all(
        newImages.map(async (img) => {
          const result = await cloudinary.uploader.upload(img.path, {
            resource_type: "image",
          });
          return {
            url: result.secure_url,
            public_id: result.public_id,
          };
        }),
      );
    } else {
      // If no new images uploaded, keep existing ones
      imageData = existingProduct.image;
    }

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true",
      date: Date.now(),
      image: imageData,
    };

    await ProductModel.findByIdAndUpdate(
      req.params.id,
      { ...productData },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Product update successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.body.id);
    res.status(200).json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await ProductModel.findById(productId);
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
  updateProduct
};

