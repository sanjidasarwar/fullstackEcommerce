import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import { upload_area } from "../assets/index";

const Add = () => {
  const formObj = {
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    bestSeller: false,
    sizes: [],
    images: [],
  };
  const [data, setData] = useState(formObj);

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

      // data.images[0] && formData.append("image1", data.images[0]);
      // data.images[1] && formData.append("image2", data.images[1]);
      // data.images[2] && formData.append("image3", data.images[2]);
      // data.images[3] && formData.append("image4", data.images[3]);

      data.images.forEach((img, i) => {
        formData.append(`image${i + 1}`, img);
      });

      const response = await axios.post(backendUrl + "/product/add", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        // formData.name: "",
        // formData.description: "",
        // formData.price: "",
        // formData.category: "",
        // formData.subCategory: "",
        // formData.bestSeller: false,
        // formData.sizes: [],
        // formData.images: [],
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-start gap-3 w-full">
        <p>Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img className="w-20" src={upload_area} alt="upload_image1" />
            <input
              type="file"
              id="image1"
              hidden
              onChange={(e) => handleImageUpload(e, 0)}
            />
          </label>
          <label htmlFor="image2">
            <img className="w-20" src={upload_area} alt="upload_image1" />
            <input
              type="file"
              id="image2"
              hidden
              onChange={(e) => handleImageUpload(e, 1)}
            />
          </label>
          <label htmlFor="image3">
            <img className="w-20" src={upload_area} alt="upload_image1" />
            <input
              type="file"
              id="image3"
              hidden
              onChange={(e) => handleImageUpload(e, 2)}
            />
          </label>
          <label htmlFor="image4">
            <img className="w-20" src={upload_area} alt="upload_image1" />
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
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        Add
      </button>
    </form>
  );
};

export default Add;
