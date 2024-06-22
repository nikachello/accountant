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
      <table className="text-center text-sm sm:text-lg sm:w-full">
        <tr className="text-center font-BPG-Glaho border-b-2 pb-2">
          <th>შეკვეთის ნომერი</th>
          <th>მომხმარებელი</th>
          <th>პროდუქცია</th>
          <th>ფასი</th>
          <th>მთლიანი შეკვეთა</th>
        </tr>

        {getRecentOrders(storeDatabase.userID, 5, startDate, endDate).map(
          (order) =>
            typeof order !== "string" ? (
              <tr
                className="text-center font-Nunito hover:bg-pageBG cursor-pointer"
                key={order.orderID}
              >
                <td className="p-5">{order.orderID}</td>
                <td className="p-5">{order.clientName}</td>
                <td className="p-5">
                  {order.products.length == 1 &&
                    `${order.products[0].productName} - ${order.products[0].productBrand}`}
                  {order.products.length > 1 &&
                    `${order.products[0].productName} - ${
                      order.products[0].productBrand
                    } + ${order.products.length - 1}`}
                </td>
                <td className="p-5">
                  ${order.products.length > 0 && order.products[0].productPrice}
                </td>
                <td className="p-5">${order.orderTotal}</td>
              </tr>
            ) : (
              <tr
                className="text-center font-Nunito hover:bg-pageBG cursor-pointer"
                key={order} // You might want to use a different key for error messages
              >
                <td className="p-5" colSpan={5}>
                  {order} {/* Render the error message */}
                </td>
              </tr>
            )
        )}
      </table>
    </div>
  );
};

export default RecentOrders;
