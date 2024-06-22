import storeDatabase from "../data/MockData";
import { getCustomerInfo, getRecentOrders } from "../utils/dataUtils";

interface AllOrdersProps {
  clickHandler: (order: any) => void;
}

const AllOrders: React.FC<AllOrdersProps> = ({ clickHandler }) => {
  const allOrders = getRecentOrders(storeDatabase.userID, null, null, null);
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
              className="text-sm flex justify-between bg-white p-5 rounded-md cursor-pointer mb-3 font-Nunito"
              onClick={() => clickHandler({ order: order })}
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
                <span className="p-2 bg-green-200 rounded-md">გადახდილია</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllOrders;
