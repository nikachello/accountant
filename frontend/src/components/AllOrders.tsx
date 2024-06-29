import { useEffect, useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { Order } from "../utils/types";

interface AllOrdersProps {
  clickHandler: (order: Order) => void;
  activeOrderIdProp: number | undefined;
  toggleClickHandler: () => void;
  allOrders: Order[];
}

const AllOrders: React.FC<AllOrdersProps> = ({
  clickHandler,
  activeOrderIdProp,
  toggleClickHandler,
  allOrders,
}) => {
  useEffect(() => {
    if (activeOrderIdProp != undefined) {
      setActiveOrderId(activeOrderIdProp);
    } else {
      console.log("ar aris prop");
    }
  }, [activeOrderIdProp]);

  const [activeOrderId, setActiveOrderId] = useState<number | undefined>(
    undefined
  );

  return (
    <div className="p-8 w-full">
      <div className="sm:flex text-center w-full justify-between">
        <div>
          <h1 className="text-lg font-BPG-Glaho">შეკვეთები</h1>
        </div>
      </div>
      {/* Order list */}
      <div className="mt-10">
        {allOrders?.map((order: Order) => {
          if (!order) return null;
          return (
            <div
              className={`text-sm flex justify-between bg-white p-5 rounded-md cursor-pointer mb-3 font-Nunito border ${
                order._id === activeOrderId
                  ? `md:border-gray-300`
                  : `border-transparent`
              } hover:border-gray-300`}
              onClick={() => {
                // @ts-ignore
                clickHandler({ order: order });
                setActiveOrderId(order._id);
              }}
            >
              {/* <div>{order._id}</div> */}
              <div>{order.client.name}</div>
              <div className="hidden lg:block">{order.client?.mail}</div>
              <div className="hidden lg:block">{order.client?.phone}</div>
              {order.products.length > 1 ? (
                <div className="hidden lg:block">
                  {order.products[0].name} + {order.products.length - 1}
                </div>
              ) : (
                <div className="hidden lg:block">asdasd</div>
              )}
              <div>${order.total}</div>
              <div className="">
                {order.isMoneyReceived ? (
                  <span className="p-2 bg-green-200 rounded-md">
                    გადახდილია
                  </span>
                ) : (
                  <span className="p-2 bg-orange-400 rounded-md">
                    გადასახდელია
                  </span>
                )}
              </div>
              <div className="block md:hidden" onClick={toggleClickHandler}>
                <CgDetailsMore />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllOrders;
