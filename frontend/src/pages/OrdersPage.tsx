import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AllOrders from "../components/AllOrders";
import OrderDetails from "../components/OrderDetails";
import Sidebar from "../components/sidebar/Sidebar";
import axios from "axios";
import { Order } from "../utils/types";
import OrderAddForm from "../components/OrderAddForm";

interface OrderDetailsState {
  orderInfo: Order | null;
}

function Orders() {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<OrderDetailsState>({
    orderInfo: location.state?.order || null,
  });

  const [fetchedOrders, setFetchedOrders] = useState<Order[]>([]);
  const [activeOrderId, setActiveOrderId] = useState<number | undefined>(
    undefined
  );

  const [addOrderFormVisible, setAddOrderFormVisible] = useState(false);

  useEffect(() => {
    if (location.state) {
      const order = location.state.orderInfo;
      setOrderDetails({ orderInfo: order });
      setActiveOrderId(location.state.activeOrderId);
    } else {
      console.log("No state found");
    }
  }, [location.state]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get<Order[]>(
        "http://localhost:5000/api/v1/orders",
        {
          withCredentials: true,
        }
      );
      setFetchedOrders(response.data);
    } catch (err) {
      console.log(err);
    }
  };

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
      {!addOrderFormVisible && (
        <div
          className={`${
            areDetailsVisible ? "hidden" : "w-11/12 md:w-8/12"
          } bg-pageBG flex flex-col`}
        >
          <AllOrders
            allOrders={fetchedOrders}
            clickHandler={clickHandler}
            activeOrderIdProp={activeOrderId}
            toggleClickHandler={toggleClickHandler}
          />
          <div
            onClick={() => setAddOrderFormVisible(true)}
            className="bg-primaryButton w-1/2 text-white text-sm mt-2 sm:mt-0 p-3 rounded-md cursor-pointer hover:bg-primaryButtonHover self-center text-center"
          >
            + დაამატე შეკვეთა
          </div>
        </div>
      )}

      {!addOrderFormVisible && (
        <div
          className={`${
            areDetailsVisible
              ? "w-11/12 md:w-8/12"
              : "hidden md:block md:w-6/12"
          }  bg-white`}
        >
          <OrderDetails
            orderDetails={orderDetails}
            toggleClickHandler={toggleClickHandler}
          />
        </div>
      )}

      {addOrderFormVisible && (
        <OrderAddForm
          fetchOrders={fetchOrders}
          setAddOrderFormVisible={setAddOrderFormVisible}
        />
      )}
    </div>
  );
}

export default Orders;
