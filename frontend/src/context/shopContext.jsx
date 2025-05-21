import { createContext, useEffect, useState } from "react";
// import { products } from "../data/products";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShopContextProvider = (props) => {
  const currency = "$";
  const delevery_fee = 10;
  const [cartItems, setCartItems] = useState({});
  const [sizeAlert, setSizeAlert] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (!size) {
      setSizeAlert(true);
      return;
    }

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
  };

  const getCartCount = () => {
    // let totalCount = 0;
    // for (const items in cartItems) {
    //   for (const item in cartItems[items]) {
    //     try {
    //       if (cartItems[items][item] > 0) {
    //         totalCount += cartItems[items][item];
    //       }
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   }
    // }
    // return totalCount;
    try {
      return Object.values(cartItems).reduce(
        (total, catagory) =>
          total + Object.values(catagory).reduce((sum, count) => sum + count),
        0
      );
    } catch (e) {
      console.log(e);
    }
  };

  const updateQuantity = (productId, size, quanitity) => {
    let cartData = structuredClone(cartItems);
    cartData[productId][size] = quanitity;
    setCartItems(cartData);
  };

  const sumOfEachSizeProduct = (price, quanitity) => {
    return (price * quanitity).toFixed(2);
  };

  const getProductPrice = (products) => {
    return products.reduce((map, product) => {
      map[product._id] = product.price;
      return map;
    }, {});
  };

  const getCartTotal = () => {
    let total = 0;
    const productsPrice = getProductPrice(products);

    for (const productId in cartItems) {
      const price = productsPrice[productId];
      if (price) {
        const totalProduct = Object.values(cartItems[productId]).reduce(
          (sum, prev) => sum + prev,
          0
        );
        total += price * totalProduct;
      }
    }
    return total;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const value = {
    products,
    currency,
    delevery_fee,
    cartItems,
    addToCart,
    sizeAlert,
    getCartCount,
    updateQuantity,
    sumOfEachSizeProduct,
    getCartTotal,
    navigate,
    backendUrl,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
