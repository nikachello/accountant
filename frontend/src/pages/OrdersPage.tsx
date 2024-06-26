import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<OrderDetailsState>({
    orderInfo: location.state?.order || null,
  });

  const [activeOrderId, setActiveOrderId] = useState(undefined);
  useEffect(() => {
    if (location.state) {
      const order = location.state.orderInfo;
      setOrderDetails({ orderInfo: order });
      setActiveOrderId(location.state.activeOrderId);
    } else {
      console.log("ar aris state");
    }
  }, [location.state]);

  function clickHandler(order: Order) {
    setOrderDetails({
      orderInfo: order,
    });
  }

  const toggleClickHandler = () => {
    setAreDetailsVisible(!areDetailsVisible);
  };

  const [areDetailsVisible, setAreDetailsVisible] = useState(false);

  return (
    <div className="flex flex-row bg-pageBG min-h-screen">
      <Sidebar activeTab="შეკვეთები" />
      <div
        className={`${
          areDetailsVisible ? "hidden" : "w-11/12 md:w-8/12"
        } bg-pageBG`}
      >
        <AllOrders
          clickHandler={clickHandler}
          activeOrderIdProp={activeOrderId}
          toggleClickHandler={toggleClickHandler}
        />
      </div>
      <div
        className={`${
          areDetailsVisible ? "w-11/12 md:w-8/12" : "hidden md:block md:w-6/12"
        }  bg-white`}
      >
        <OrderDetails
          orderDetails={orderDetails}
          toggleClickHandler={toggleClickHandler}
        />
      </div>
    </div>
  );

  // md:block md:w-6/12
}

export default Orders;
