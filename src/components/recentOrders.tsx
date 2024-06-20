import storeDatabase from "../data/MockData";
import { getRecentOrders } from "../utils/dataUtils";

const RecentOrders = () => {
  return (
    <div>
      <h1>ახალი შეკვეთები</h1>
      <table className="text-center w-full">
        <tr className="text-center">
          <th>შეკვეთის ნომერი</th>
          <th>მომხმარებელი</th>
          <th>პროდუქცია</th>
          <th>ფასი</th>
          <th>მთლიანი შეკვეთა</th>
        </tr>

        {getRecentOrders(storeDatabase.userID, 5).map((order) => (
          <tr className="p-5" key={order.orderID}>
            <td>{order.orderID}</td>
            <td>{order.clientName}</td>
            <td>
              {order.products.length > 0 && order.products[0].productName}

              {order.products.length > 1 && " ..."}
            </td>
            <td>
              {order.products.length > 0 && order.products[0].productPrice}
              {order.products.length > 1 && " ..."}
            </td>
            <td>{order.products[0].price}</td>
            <td>{order.orderTotal}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default RecentOrders;
