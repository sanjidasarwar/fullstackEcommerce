import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";
import { parcel_icon } from "../assets";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const loadAllOrders = async () => {
    try {
      if (!token) return null;
      const response = await axios.get(backendUrl + "/order/list", {
        headers: { token },
      });

      if (response.data.success) {
        setOrders(response.data.allOrdersList);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleStatus = async (e, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/order/status",
        { orderId, status: e.target.value },
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        await loadAllOrders();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  useEffect(() => {
    loadAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            <img className="w-12" src={parcel_icon} alt="" />
            <div>
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return (
                    <p className="py-0.5" key={index}>
                      {item.name}x{item.quantity}
                      <span>{item.size}</span>
                    </p>
                  );
                } else {
                  return (
                    <p className="py-0.5" key={index}>
                      {item.name}x{item.quantity}
                      <span>{item.size}</span>,{" "}
                    </p>
                  );
                }
              })}
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street + ","} </p>
                <p>
                  {order.address.city +
                    "," +
                    order.address.state +
                    "," +
                    order.address.country +
                    "," +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone} </p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Items: {order.items.length}
              </p>
              <p className="mt-3">Method: {order.items.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>
            <select
              value={order.status}
              onChange={(e) => handleStatus(e, order._id)}
              className="p-2 font-semibold"
              name=""
              id=""
            >
              <option value="order placeed">Order Placeed</option>
              <option value="packing">Packing</option>
              <option value="shiping">Shiping</option>
              <option value="out for delivery">Out for Delivery</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
