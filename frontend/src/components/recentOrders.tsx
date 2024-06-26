import { Link } from "react-router-dom";
import storeDatabase from "../data/MockData";
import { getRecentOrders } from "../utils/dataUtils";

interface RecentOrdersProps {
  startDate: Date | null; // Assuming startDate is of type Date
  endDate: Date | null; // Assuming endDate is of type Date
}

const RecentOrders: React.FC<RecentOrdersProps> = ({ startDate, endDate }) => {
  return (
    <div className="">
      <h1 className="font-BPG-Glaho text-lg mb-5">ახალი შეკვეთები</h1>
      <div className="w-full flex justify-between p-5">
        <span className="w-1/4">შეკვეთა</span>
        <span className="w-1/4">მომხმარებელი</span>
        <span className="w-1/4">მოდელი</span>
        <span className="w-1/4">თანხა</span>
        <span className="w-1/4">სტატუსი</span>
      </div>
      <div className="">
        {getRecentOrders(storeDatabase.userID, 5, startDate, endDate).map(
          (order) => {
            if (!order) return null;
            return (
              <Link
                to="/orders"
                state={{
                  orderInfo: { order: order },
                  activeOrderId: order.orderID,
                }}
              >
                <div
                  key={order.orderID}
                  className="text-sm flex justify-between items-center bg-pageBG p-5 rounded-md cursor-pointer mb-3 font-Nunito"
                >
                  <div className="w-1/4">{order.orderID}</div>
                  <div className="w-1/4">{order.clientName}</div>
                  {order.products.length > 1 ? (
                    <div className="hidden lg:block w-1/4">
                      {order.products[0].productName} +{" "}
                      {order.products.length - 1}
                    </div>
                  ) : (
                    <div className="hidden lg:block w-1/4">
                      {order.products[0].productName}
                    </div>
                  )}
                  <div className="w-1/4">${order.orderTotal}</div>
                  <div className="w-1/4">
                    <span className="p-2 bg-green-200 rounded-md">
                      გადახდილია
                    </span>
                  </div>
                </div>
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
};

export default RecentOrders;
