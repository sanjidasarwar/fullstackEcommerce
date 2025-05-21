import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import { upload_area } from "../assets/index";

const Update = ({ token }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const existingProduct = location.state?.product;
  const blobUrlsRef = useRef([]);

  const formObj = {
    id: existingProduct._id,
    name: existingProduct.name,
    description: existingProduct.description,
    price: existingProduct.price,
    category: existingProduct.category,
    subCategory: existingProduct.subCategory,
    bestSeller: existingProduct.bestSeller,
    sizes: existingProduct.sizes,
    images: existingProduct.image,
  };
  const [data, setData] = useState(formObj);

  const getImgSrc = (img) => {
    if (!img) return upload_area;
    if (typeof img === "string") return img;

    const blobUrl = URL.createObjectURL(img);
    blobUrlsRef.current.push(blobUrl);
    return blobUrl;
  };

  const handleChange = (e) => {
    const { type, name, checked, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImages = [...data.images];
    newImages[index] = file;

    setData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const handleSizeClick = (size) => {
    setData((prev) => {
      const sizes = prev.sizes.includes(size)
        ? prev.sizes.filter((includedSize) => includedSize !== size)
        : [...prev.sizes, size];

      return { ...prev, sizes };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("subCategory", data.subCategory);
      formData.append("bestSeller", data.bestSeller);
      formData.append("sizes", JSON.stringify(data.sizes));

      data.images.forEach((img, i) => {
        formData.append(`image${i + 1}`, img);
      });

      const response = await axios.patch(
        backendUrl + `/product/edit/${data.id}`,
        formData,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/list");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      blobUrlsRef.current = [];
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-start gap-3 w-full">
        <p>Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={getImgSrc(data.images[0])}
              alt="upload_image1"
            />
            <input
              type="file"
              id="image1"
              hidden
              onChange={(e) => handleImageUpload(e, 0)}
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={getImgSrc(data.images[1])}
              alt="upload_image1"
            />
            <input
              type="file"
              id="image2"
              hidden
              onChange={(e) => handleImageUpload(e, 1)}
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={getImgSrc(data.images[2])}
              alt="upload_image1"
            />
            <input
              type="file"
              id="image3"
              hidden
              onChange={(e) => handleImageUpload(e, 2)}
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={getImgSrc(data.images[3])}
              alt="upload_image1"
            />
            <input
              type="file"
              id="image4"
              hidden
              onChange={(e) => handleImageUpload(e, 3)}
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Product name"
          type="text"
          name="name"
          id="name"
          value={data.name}
          onChange={handleChange}
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Product description"
          name="description"
          id="description"
          value={data.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            name="category"
            id="category"
            className="w-full px-3 py-2"
            onChange={handleChange}
            value={data.category}
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub Catagory</p>
          <select
            name="subCategory"
            id="subCategory"
            className="w-full px-3 py-2"
            onChange={handleChange}
            value={data.subCategory}
          >
            <option value="topwear">Topwear</option>
            <option value="bottomWear">BottomWear</option>
            <option value="winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            className="w-full px-3 py-2 sm:w-[120px]"
            placeholder="25"
            type="Number"
            name="price"
            id="price"
            value={data.price}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div onClick={() => handleSizeClick("s")}>
            <p
              className={`${
                data.sizes.includes("s") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>
          <div onClick={() => handleSizeClick("m")}>
            <p
              className={`${
                data.sizes.includes("m") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              M
            </p>
          </div>
          <div onClick={() => handleSizeClick("l")}>
            <p
              className={`${
                data.sizes.includes("l") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              L
            </p>
          </div>
          <div onClick={() => handleSizeClick("xl")}>
            <p
              className={`${
                data.sizes.includes("xl") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XL
            </p>
          </div>
          <div onClick={() => handleSizeClick("xxl")}>
            <p
              className={`${
                data.sizes.includes("xxl") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestSeller"
          name="bestSeller"
          checked={data.bestSeller}
          onChange={handleChange}
        />
        <label className="cursor-pointer" htmlFor="bestSeller">
          Add to bestseller
        </label>
      </div>
      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black text-white cursor-pointer"
      >
        update
      </button>
    </form>
  );
};

export default Update;
