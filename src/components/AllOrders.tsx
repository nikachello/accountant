import { useEffect, useState } from "react";
import storeDatabase from "../data/MockData";
import { getCustomerInfo, getRecentOrders } from "../utils/dataUtils";
import { CgDetailsMore } from "react-icons/cg";

interface AllOrdersProps {
  clickHandler: (order: any) => void;
  activeOrderIdProp: number | undefined;
  toggleClickHandler: () => void;
}

const AllOrders: React.FC<AllOrdersProps> = ({
  clickHandler,
  activeOrderIdProp,
  toggleClickHandler,
}) => {
  const allOrders = getRecentOrders(storeDatabase.userID, null, null, null);

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
    <div className="p-8">
      <div className="sm:flex text-center w-full justify-between">
        <div>
          <h1 className="text-lg font-BPG-Glaho">შეკვეთები</h1>
        </div>
        <div className="bg-primaryButton text-white text-sm mt-2 sm:mt-0 p-3 rounded-md cursor-pointer hover:bg-primaryButtonHover">
          + დაამატე შეკვეთა
        </div>
      </div>
      {/* Order list */}
      <div className="mt-10">
        {allOrders?.map((order) => {
          if (!order) return null;
          const customer = getCustomerInfo(order.clientId);
          return (
            <div
              className={`text-sm flex justify-between bg-white p-5 rounded-md cursor-pointer mb-3 font-Nunito border ${
                order.orderID === activeOrderId
                  ? `border-gray-300`
                  : `border-transparent`
              } hover:border-gray-300`}
              onClick={() => {
                clickHandler({ order: order });
                setActiveOrderId(order.orderID);
              }}
            >
              <div>{order.orderID}</div>
              <div>{customer?.name}</div>
              <div className="hidden lg:block">{customer?.email}</div>
              <div className="hidden lg:block">{customer?.phoneNum}</div>
              {order.products.length > 1 ? (
                <div className="hidden lg:block">
                  {order.products[0].productName} + {order.products.length - 1}
                </div>
              ) : (
                <div className="hidden lg:block">
                  {order.products[0].productName}
                </div>
              )}
              <div>${order.orderTotal}</div>
              <div className="">
                {order.isOrderPaid ? (
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
