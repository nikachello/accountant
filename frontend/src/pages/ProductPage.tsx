import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:5000/api/v1/products");
    setProducts(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchProducts();
  });

  return (
    <div className="flex flex-row bg-pageBG min-h-screen">
      <Sidebar activeTab="პროდუქტები" />
      <div className="font-BPG-Glaho p-6 text-lg w-full">
        პროდუქტები
        <div className="mt-5">
          <div className="flex flex-col justify-between w-full">
            {products.map((product) => (
              <div key={product._id} className="mb-3 w-full">
                <div className="flex items-center text-center align-center justify-between mb-3 w-full p-5 bg-white rounded-lg">
                  <div className="h-24 min-w-24 overflow-hidden rounded-full">
                    <img
                      className="object-cover w-full h-full"
                      src={product.img}
                      alt={product.name}
                    />
                  </div>

                  <span className="font-semibold text-gray-800">
                    {product.name}
                  </span>
                  <span className="font-semibold text-gray-800">
                    {product.brand}
                  </span>

                  <div>
                    <span>${product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
