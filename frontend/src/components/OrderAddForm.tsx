import React, { useState } from "react";
import axios from "axios";

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
    products: "",
    total: 0,
    isShipped: false,
    weight: 0,
    paymentType: "PayPal",
    isMoneyReceived: false,
    cargo: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      await axios.post("http://localhost:5000/api/v1/orders", formData, {
        withCredentials: true,
      });
      fetchOrders();
      setAddOrderFormVisible(false);
    } catch (err) {
      console.log(err);
    }
  };

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
                მომხმარებლის სახელი
              </label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                პროდუქტის დასახელება
              </label>
              <input
                type="text"
                name="products"
                value={formData.products}
                onChange={handleChange}
                placeholder="Product Details"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setAddOrderFormVisible(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderAddForm;
