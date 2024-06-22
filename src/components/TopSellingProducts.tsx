import {
  calculateTopSellingProducts,
  getProductWithId,
} from "../utils/dataUtils";

interface TopSellingProductsProps {
  amountToShow: number;
  startDate: Date | null;
  endDate: Date | null;
}

const TopSellingProducts: React.FC<TopSellingProductsProps> = ({
  amountToShow,
  startDate,
  endDate,
}) => {
  const products = calculateTopSellingProducts(
    amountToShow,
    startDate,
    endDate
  );

  return (
    <div className="h-1/2 sm:h-full pb-5">
      <h1 className="font-BPG-Glaho text-lg">ხშირად გაყიდვადი</h1>
      <div className="flex flex-col justify-between w-full">
        {products.map((product) => (
          <div key={product.productId} className="p-4 m-3 w-full">
            <div className="flex items-center mb-3 w-full">
              <div className="h-24 min-w-24 overflow-hidden rounded-full">
                <img
                  className="object-cover w-full h-full"
                  src={getProductWithId(product.productId)?.img}
                  alt={getProductWithId(product.productId)?.name}
                />
              </div>
              <div className="ml-4 flex flex-row justify-between items-center w-full">
                <div>
                  <span className="font-semibold text-gray-800">
                    {getProductWithId(product.productId)?.name} -{" "}
                    {getProductWithId(product.productId)?.brand}
                  </span>
                </div>
                <div>
                  <span>${getProductWithId(product.productId)?.price}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingProducts;
