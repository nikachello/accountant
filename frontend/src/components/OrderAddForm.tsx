import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../utils/types";

interface OrderAddFormProps {
  setAddOrderFormVisible: (state: boolean) => void;
  fetchOrders: () => void;
}

const OrderAddForm: React.FC<OrderAddFormProps> = ({
  setAddOrderFormVisible,
  fetchOrders,
}) => {
  const [formData, setFormData] = useState({
    clientName: "",
    clientMail: "",
    clientPhone: "",
    products: [],
    total: 0,
    isShipped: false,
    weight: 0,
    paymentType: "PayPal",
    isMoneyReceived: false,
    cargo: 0,
    currentProduct: "",
  });

  const [customers, setCustomers] = useState([]);
  const [customerList, showCustomerList] = useState(false);
  const [customerInputsDisabled, setCustomerInputsDisabled] = useState(false);

  const [products, setProducts] = useState([]);
  const [productList, showProductList] = useState(false);
  const [productInputsDisabled, setProductInputsDisabled] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    //@ts-ignore
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value === "true" || value === "false"
          ? value === "true"
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(formData);
      await axios.post("http://localhost:5000/api/v1/orders", formData, {
        withCredentials: true,
      });
      fetchOrders();
      setAddOrderFormVisible(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleExistingCustomer = (customer: any) => {
    setFormData({
      ...formData,
      clientMail: customer.mail,
      clientName: customer.name,
      clientPhone: customer.phone,
      products: [],
    });

    setCustomerInputsDisabled(true);
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      currentProduct: value,
    });
  };

  const addProduct = (product: Product) => {
    if (formData.currentProduct) {
      setFormData({
        ...formData,
        products: [...formData.products, product.name],
        currentProduct: "",
      });
    }
  };

  const removeProduct = (index: number) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      products: updatedProducts,
    });
  };

  useEffect(() => {
    if (formData.clientMail.length === 0) {
      showCustomerList(false);
      setCustomers([]);
      return;
    }
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/clients?mail=${formData.clientMail}`,
          {
            withCredentials: true,
          }
        );
        setCustomers(response.data);
        showCustomerList(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCustomers();
    console.log(customers);
  }, [formData.clientMail]);

  useEffect(() => {
    if (formData.currentProduct.length === 0) {
      setProducts([]);
      return;
    }
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/products?name=${formData.currentProduct}`,
          {
            withCredentials: true,
          }
        );
        setProducts(response.data);
        console.log(response.data);
        showProductList(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
    console.log(products);
  }, [formData.currentProduct]);

  return (
    <div className="flex items-center justify-center h-full w-full font-BPG-Glaho">
      <div className="bg-white px-10 pt-2 pb-12 shadow-md flex flex-col text-center w-1/2">
        <div>
          <span>დაამატე შეკვეთა</span>
        </div>
        <div>
          <form className="w-full mt-2" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                მომხმარებლის მეილი
              </label>
              <input
                type="email"
                name="clientMail"
                value={formData.clientMail}
                onChange={handleChange}
                placeholder="John@gmail.com"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={customerInputsDisabled}
                required
              />
            </div>
            <div className="-mt-4">
              {customerList &&
                formData.clientMail.length > 0 &&
                customerInputsDisabled === false && (
                  <div className="-mt-4">
                    {customers.map((customer) => (
                      <div
                        onClick={() => handleExistingCustomer(customer)}
                        key={customer._id}
                        className="bg-gray-300 p-3 hover:bg-white cursor-pointer"
                      >
                        {customer.name}
                      </div>
                    ))}
                  </div>
                )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                მომხმარებლის სახელი
              </label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={customerInputsDisabled}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                მომხმარებლის ტელეფონის ნომერი
              </label>
              <input
                type="text"
                name="clientPhone"
                value={formData.clientPhone}
                onChange={handleChange}
                placeholder="+15836548987"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={customerInputsDisabled}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                პროდუქტის დასახელება
              </label>
              <input
                type="text"
                name="currentProduct"
                value={formData.currentProduct || ""}
                onChange={handleProductChange}
                placeholder="Product Details"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={productInputsDisabled}
                required
              />
            </div>

            <div className="-mt-4">
              {productList && (
                <div className="-mt-4">
                  {products.map((product) => (
                    <div
                      onClick={() => addProduct(product)}
                      className="bg-gray-300 p-3 hover:bg-white cursor-pointer"
                    >
                      {product.name} - {product.brand}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-4">
              {formData.products.map((product, index) => (
                <div
                  key={index}
                  className="bg-gray-300 p-3 hover:bg-white cursor-pointer flex justify-between items-center"
                >
                  <span>{product}</span>
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    წაშლა
                  </button>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                გაყიდული ფასი
              </label>
              <input
                type="number"
                name="total"
                value={formData.total}
                onChange={handleChange}
                placeholder="250"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                გაგზავნილია?
              </label>
              <select
                name="isShipped"
                value={formData.isShipped.toString()}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="true">კი</option>
                <option value="false">არა</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                პროდუქტის წონა
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="3"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                გადახდის ტიპი
              </label>
              <select
                name="paymentType"
                value={formData.paymentType}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="PayPal">PayPal</option>
                <option value="Western Union">Western Union</option>
                <option value="MoneyGram">MoneyGram</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                თანხა მიღებულია?
              </label>
              <select
                name="isMoneyReceived"
                value={formData.isMoneyReceived.toString()}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="true">კი</option>
                <option value="false">არა</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                ჯამური გაგზავნის თანხა
              </label>
              <input
                type="number"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                placeholder="350"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                დამატება
              </button>
              <button
                type="button"
                onClick={() => setAddOrderFormVisible(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                გაუქმება
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderAddForm;
