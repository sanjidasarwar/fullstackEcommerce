import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { backendUrl, currency } from "../App";

const List = ({ token }) => {
  const [productList, setProductList] = useState([]);

  const navigate = useNavigate();

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

  const handleDeleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;
    try {
      const response = await axios.post(
        backendUrl + "/product/remove",
        {
          id,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchProduct();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const handleUpdate = (product) => {
    navigate("/update", { state: { product } });
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
            <td
              className="px-4 py-2 border border-gray-200 text-center"
              colSpan={2}
            >
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
              <td
                className="px-4 py-2 border border-gray-200 text-center text-red-500 cursor-pointer"
                onClick={() => handleDeleteProduct(product._id)}
              >
                Delete
              </td>
              <td
                className="px-4 py-2 border border-gray-200 text-center text-blue-500 cursor-pointer"
                onClick={() => handleUpdate(product)}
              >
                Edit
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default List;
