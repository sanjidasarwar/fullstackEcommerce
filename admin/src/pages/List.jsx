import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";

const List = () => {
  const [productList, setProductList] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(backendUrl + "/product/list");
      if (response.data.products) {
        setProductList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <table className="min-w-full table-auto border-collapse border border-gray-200 mt-4">
        <tbody>
          <tr className="bg-gray-100 text-left">
            <td className="px-4 py-2 border border-gray-200">Product Name</td>
            <td className="px-4 py-2 border border-gray-200">Category</td>
            <td className="px-4 py-2 border border-gray-200">price</td>
            <td className="px-4 py-2 border border-gray-200 text-center">
              Action
            </td>
          </tr>
          {productList.map((product, index) => (
            <tr key={index}>
              <td className="flex gap-1 px-4 py-2 border border-gray-200 ">
                <img className="w-12" src={product.image[0]} alt="" />
                <span className="self-center">{product.name}</span>
              </td>
              <td className="px-4 py-2 border border-gray-200 ">
                {product.description}
              </td>
              <td className="px-4 py-2 border border-gray-200 ">
                {currency}
                {product.price}
              </td>
              <td className="px-4 py-2 border border-gray-200 text-center hover:text-red-500 cursor-pointer">
                X
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default List;
