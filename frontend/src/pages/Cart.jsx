import { useContext, useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/shopContext";

const Cart = () => {
  const {
    cartItems,
    products,
    currency,
    updateQuantity,
    sumOfEachSizeProduct,
    navigate,
  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  const handleInputChange = (e, item) => {
    const value = e.target.value;
    if (value === "" || value === "0") return; // Ignore empty or zero values
    updateQuantity(item._id, item.size, Number(value)); // Update quantity
  };

  useEffect(() => {
    if (products.length > 0) {
      let tempData = [];
      // for (const items in cartItems) {
      //   for (const item in cartItems[items]) {
      //     if (cartItems[items][item] > 0) {
      //       tempData.push({
      //         _id: items,
      //         size: item,
      //         quantity: cartItems[items][item],
      //       });
      //     }
      //   }
      // }
      const arrOfCartItems = Object.entries(cartItems);
      arrOfCartItems.forEach(([productId, sizes]) => {
        Object.entries(sizes).forEach(([size, quantity]) => {
          tempData.push({
            _id: productId,
            size,
            quantity,
          });
        });
      });
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className=" text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const cartProduct = products.find(
            (product) => product._id == item._id
          );

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={cartProduct.image[0]}
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {cartProduct.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {sumOfEachSizeProduct(cartProduct.price, item.quantity)}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleInputChange(e, item)}
              />
              <FaRegTrashCan
                className="cursor-pointer"
                onClick={() => updateQuantity(item._id, item.size, 0)}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className=" w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
