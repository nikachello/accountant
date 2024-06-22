import storeDatabase from "../data/MockData";
import { getCustomerInfo, getRecentOrders } from "../utils/dataUtils";

interface AllOrdersProps {
  clickHandler: (order: any) => void;
}

const AllOrders: React.FC<AllOrdersProps> = ({ clickHandler }) => {
  const allOrders = getRecentOrders(storeDatabase.userID, null, null, null);
  return (
    <div className="p-8">
      <div className="flex w-full justify-between">
        <div>
          <h1 className="text-lg font-BPG-Glaho">შეკვეთები</h1>
        </div>
        <div className="bg-primaryButton text-white p-3 rounded-md cursor-pointer hover:bg-primaryButtonHover">
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
              className="flex justify-between bg-white p-5 rounded-md cursor-pointer mb-3 font-Nunito"
              onClick={() => clickHandler({ order: order })}
            >
              <div>{order.orderID}</div>
              <div>{customer?.name}</div>
              <div>{customer?.email}</div>
              <div>{customer?.phoneNum}</div>
              <div>Louis Vuitton - Neverfull</div>
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
