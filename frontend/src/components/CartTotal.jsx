import React, { useContext } from "react";
import Title from "./Title";
import { ShopContext } from "../context/shopContext";

function CartTotal() {
  const { currency, getCartTotal, delevery_fee } = useContext(ShopContext);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {getCartTotal()}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {delevery_fee}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {" "}
            {currency}{" "}
            {getCartTotal() === 0 ? 0 : getCartTotal() + delevery_fee}
          </b>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
