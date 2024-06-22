import { useState } from "react";
import AllOrders from "../components/AllOrders";
import OrderDetails from "../components/OrderDetails";
import Sidebar from "../components/sidebar/Sidebar";
import { getCustomerInfo } from "../utils/dataUtils";

function Orders() {
  const [orderDetails, setOrderDetails] = useState(1);

  function clickHandler(orderInfo) {
    setOrderDetails({
      orderInfo: orderInfo,
    });
  }

  return (
    <div className="flex flex-row bg-pageBG min-h-screen">
      <Sidebar activeTab="შეკვეთები" />
      <div className="w-3/6 bg-pageBG ">
        <AllOrders clickHandler={clickHandler} />
      </div>
      <div className="w-2/6 bg-white ">
        <OrderDetails orderDetails={orderDetails} />
      </div>
    </div>
  );
}

export default Orders;
