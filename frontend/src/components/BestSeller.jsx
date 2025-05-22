import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

function BestSeller() {
  const [bestSeller, setBestSeller] = useState([]);
  const { products } = useContext(ShopContext);

  useEffect(() => {
    const bestProduct = products.filter((product) => product.bestSeller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Best"} text2={"Sellers"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          sunt explicabo blanditiis ipsam dolorem commodi odit
        </p>
      </div>
      {/* Latest Product */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
