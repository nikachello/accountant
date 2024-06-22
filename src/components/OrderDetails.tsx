import { LuPencil } from "react-icons/lu";
import { IoCalendarClearOutline } from "react-icons/io5";

interface OrderDetails {
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

// @ts-ignore
const OrderDetails = ({ orderDetails }) => {
  return (
    <div className="p-4 font-BPG-Glaho">
      <div className="flex flex-row justify-between">
        <div className="md:flex md:flex-col lg:block">
          <span>შეკვეთა: {orderDetails?.orderInfo?.order.orderID}</span>
          <span className="mb-2 mt-2 lg:mt-0 lg:mb-0 lg:ml-5 bg-orange-400 p-2 rounded-md text-white">
            მზადდება გასაგზავნად
          </span>
          <span className="lg:ml-5 bg-green-700 p-2 rounded-md text-white">
            თანხა გადახდილია
          </span>
        </div>
        <div className="cursor-pointer">
          <LuPencil />
        </div>
      </div>
      <div className="my-3 flex flex-row items-center">
        <div>
          <IoCalendarClearOutline />
        </div>
        <div className="mt-1 ml-2">
          <span>2024-03-23</span>
        </div>
      </div>
      <div className="ml-1">
        <span>ჯამური თანხა: ${orderDetails.orderInfo?.order.orderTotal}</span>
      </div>
      <div className="flex flex-row p-4 gap-3">
        <div className="border border-textGray  p-4 rounded-md w-1/2">
          <p className="font-Nunito text-[20px] font-bold">მყიდველი</p>
          <p className="font-Nunito text-[15px] color-textGray">
            {orderDetails.orderInfo?.order.clientName}
          </p>
          <p className="font-Nunito text-[15px]  color-textGray">
            {orderDetails.orderInfo?.order.clientEmail}
          </p>
          <p className="font-Nunito text-[15px]  color-textGray">
            {orderDetails.orderInfo?.order.clientPhoneNum}
          </p>
        </div>

        <div className="border border-textGray  p-4 rounded-md w-1/2">
          <p className="font-Nunito text-[20px] font-bold">შეკვეთა</p>
          <p className="font-Nunito text-[15px]  color-textGray">
            წონა: {orderDetails.orderInfo?.order.orderWeight}კგ -{" "}
            {orderDetails.orderInfo?.order.cargoPrice}$
          </p>
          <p className="font-Nunito text-[15px] color-textGray">
            გადახდის მეთოდი: {orderDetails.orderInfo?.order.orderPayment}
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
        {orderDetails.orderInfo?.order.products[0].name}

        {orderDetails.orderInfo?.order.products.map((product: any) => (
          <div>
            {" "}
            <div className="flex justify-between border border-textGray  p-4 rounded-md cursor-pointer mb-3 font-Nunito">
              <div>1</div>
              <div>
                {product.productBrand} - {product.productName}
              </div>
              <div>{product.productPrice}$</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
