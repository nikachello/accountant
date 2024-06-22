import { useState } from "react";
import AllOrders from "../components/AllOrders";
import OrderDetails from "../components/OrderDetails";
import Sidebar from "../components/sidebar/Sidebar";

interface Order {
  orderID: number;
  clientId: number;
  clientName: string;
  clientEmail: string;
  clientPhoneNum: string;
  products: {
    productName: string | undefined;
    productPrice: number | undefined;
    productBrand: string | undefined;
  }[];
  orderTotal: number;
  isOrderShipped: boolean;
  isOrderPaid: boolean;
  orderDate: Date;
  cargoPrice: number;
  orderWeight: number;
  orderPayment: string;
}

interface OrderDetailsState {
  orderInfo: Order | null;
}

function Orders() {
  const [orderDetails, setOrderDetails] = useState<OrderDetailsState>({
    orderInfo: null,
  });

  function clickHandler(order: Order) {
    setOrderDetails({
      orderInfo: order,
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
