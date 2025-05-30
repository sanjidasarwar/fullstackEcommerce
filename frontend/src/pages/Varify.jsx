import axios from "axios";
import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../context/shopContext";

function Varify() {
  const { navigate, token, handleCartItem, backendUrl } =
    useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const varifyPayment = async () => {
    try {
      if (!token) return null;
      const response = await axios.post(
        backendUrl + "/order/varifyStripe",
        { success, orderId },
        { headers: { token } }
      );
      console.log(response);

      if (response.data.success) {
        handleCartItem({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    varifyPayment();
  }, [token]);
  return <div>varify</div>;
}

export default Varify;
