import { LuPencil } from "react-icons/lu";
import { IoCalendarClearOutline } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import storeDatabase from "../data/MockData";
import { getOrderExpense } from "../utils/dataUtils";
import { Product } from "../utils/types";

// @ts-ignore
const OrderDetails = ({ orderDetails, toggleClickHandler }) => {
  const expense = getOrderExpense(
    storeDatabase.userID,
    orderDetails.orderInfo?.order.orderID
  );

  return (
    <div className="p-4 font-BPG-Glaho">
      <div className="flex flex-row justify-between">
        <div className="md:flex md:flex-col lg:block">
          <span>შეკვეთა: {orderDetails?.orderInfo?.order._id}</span>
          <div className="flex flex-col gap-2">
            {orderDetails?.orderInfo?.order.isShipped ? (
              <span className="mb-2 mt-2 lg:mt-0 lg:mb-0 lg:ml-5 bg-green-700 p-2 rounded-md text-white">
                გაგზავნილია
              </span>
            ) : (
              <span className="mb-2 mt-2 lg:mt-0 lg:mb-0 lg:ml-5 bg-orange-400 p-2 rounded-md text-white">
                მზადდება გასაგზავნად
              </span>
            )}
            {orderDetails?.orderInfo?.order.isMoneyReceived ? (
              <span className="lg:ml-5 bg-green-700 p-2 rounded-md text-white">
                თანხა გადახდილია
              </span>
            ) : (
              <span className="lg:ml-5 bg-orange-400 p-2 rounded-md text-white">
                არ არის გადახდილი
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <div className="cursor-pointer">
            <LuPencil />
          </div>
          <div
            className="cursor-pointer md:hidden"
            onClick={toggleClickHandler}
          >
            <IoCloseSharp />
          </div>
        </div>
      </div>
      <div className="my-3 flex flex-row items-center">
        <div>
          <IoCalendarClearOutline />
        </div>
        <div className="mt-1 ml-2">
          <span>{orderDetails.orderInfo?.order.date}</span>
        </div>
      </div>
      <div className="ml-1">
        <span>ჯამური თანხა: ${orderDetails.orderInfo?.order.total}</span>
      </div>
      <div className="flex flex-row p-4 gap-3">
        <div className="border border-textGray  p-4 rounded-md w-1/2">
          <p className="font-Nunito text-[20px] font-bold">მყიდველი</p>
          <p className="font-Nunito text-[15px] color-textGray">
            {orderDetails.orderInfo?.order.client.name}
          </p>
          <p className="font-Nunito text-[15px]  color-textGray">
            {orderDetails.orderInfo?.order.client.mail}
          </p>
          <p className="font-Nunito text-[15px]  color-textGray">
            {orderDetails.orderInfo?.order.client.phone}
          </p>
        </div>

        <div className="border border-textGray  p-4 rounded-md w-1/2">
          <p className="font-Nunito text-[20px] font-bold">შეკვეთა</p>
          <p className="font-Nunito text-[15px]  color-textGray">
            წონა: {orderDetails.orderInfo?.order.weight}კგ -{" "}
            {orderDetails.orderInfo?.order.cargo}$
          </p>
          <p className="font-Nunito text-[15px] color-textGray">
            გადახდის მეთოდი: {orderDetails.orderInfo?.order.paymentType}
          </p>
          <p className="font-Nunito text-[15px]  color-textGray">
            სტატუსი:{" "}
            {orderDetails.orderInfo?.order.isMoneyReceived
              ? "გადახდილია"
              : "გადასახდელია"}
          </p>
        </div>
      </div>

      <div className="mt-1 p-4">
        {orderDetails.orderInfo?.order.products.map((product: Product) => (
          <div>
            {" "}
            <div className="flex justify-between border border-textGray  p-4 rounded-md cursor-pointer mb-3 font-Nunito">
              <div>1</div>
              <div>
                {product.brand} - {product.name}
              </div>
              <div>{product.price}$</div>
            </div>
          </div>
        ))}
        <div className="flex justify-between border border-textGray  p-4 rounded-md cursor-pointer mb-3 font-Nunito">
          <div>
            სულ საკომისიო: $
            {(orderDetails.orderInfo?.order.total * storeDatabase.comission) /
              100}
            {expense && (
              <div>
                ხარვეზი: ${expense.amount}
                <div>კომენტარი: {expense.reason}</div>
                <div>
                  ჯამში ასაღები თანხა: $
                  {(orderDetails.orderInfo?.order.total *
                    storeDatabase.comission) /
                    100 -
                    expense.amount}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
