import storeDatabase from "../data/MockData";

export const sellerOrders = (
  userID: number,
  startDate?: Date | null,
  endDate?: Date | null
) => {
  let filteredOrders = storeDatabase.orders.filter(
    (order) => order.sellerId === userID
  );

  // Apply date filtering if startDate and endDate are provided
  if (startDate && endDate) {
    filteredOrders = filteredOrders.filter(
      (order) =>
        order.date >= startDate && // Filter orders after or on startDate
        order.date <= endDate // Filter orders before or on endDate
    );
  }

  return filteredOrders;
};

export const sellerTotalUSD = (
  userID: number,
  startDate?: Date,
  endDate?: Date
) => {
  const sellerOrdersTotal = sellerOrders(userID, startDate, endDate);

  const sellerTotalUSD = sellerOrdersTotal.reduce(
    (total, order) => total + order.total,
    0
  );

  return sellerTotalUSD;
};

export const sellerExpenses = (
  userID: number,
  startDate?: Date,
  endDate?: Date
) => {
  let sellerExpenses = storeDatabase.expenses.filter(
    (expense) => expense.sellerId === userID
  );

  if (startDate && endDate) {
    sellerExpenses = sellerExpenses.filter(
      (order) =>
        order.date >= startDate && // Filter orders after or on startDate
        order.date <= endDate // Filter orders before or on endDate
    );
  }

  return sellerExpenses;
};

export const sellerExpensesUSD = (
  userID: number,
  startDate?: Date,
  endDate?: Date
) => {
  const sellerExpensesData = sellerExpenses(userID, startDate, endDate);

  const sellerExpensesUSD = sellerExpensesData.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return sellerExpensesUSD;
};

export const getRecentOrders = (
  userID: number,
  amountToShow: number | null,
  startDate: Date | null,
  endDate: Date | null
) => {
  let recentOrders = [];

  const filteredOrders = sellerOrders(userID, startDate, endDate);

  filteredOrders.sort((a, b) => b.date.getTime() - a.date.getTime());

  if (amountToShow) {
    recentOrders = filteredOrders.slice(0, amountToShow);
  }

  recentOrders = filteredOrders;

  const ordersWithDetails = recentOrders.map((order) => {
    const client = storeDatabase.clients.find(
      (client) => client.id === order.clientId
    );

    const productIds = Array.isArray(order.productId)
      ? order.productId
      : [order.productId];

    const products = productIds.map((productId) =>
      storeDatabase.products.find((product) => product.id === productId)
    );

    if (client && products) {
      return {
        orderID: order.id,
        clientId: client.id,
        clientName: client.name,
        clientEmail: client.email,
        clientPhoneNum: client.phoneNum,
        products: products.map((product) => ({
          productName: product?.name,
          productPrice: product?.price,
          productBrand: product?.brand,
        })),
        orderTotal: order.total,
        isOrderShipped: order.isShipped,
        isOrderPaid: order.isMoneyReceived,
        orderDate: order.date,
        cargoPrice: order.totalCargo,
        orderWeight: order.weight,
        orderPayment: order.paymentType,
      };
    } else {
      return null;
    }
  });

  return ordersWithDetails.filter((order) => order !== null);
};

export const calculateTopSellingProducts = (
  amountToShow: number,
  startDate: Date | null,
  endDate: Date | null
) => {
  let soldProductQuantity: number[] = [];

  const filteredOrders = sellerOrders(storeDatabase.userID, startDate, endDate);

  const recentOrders = filteredOrders.slice(0, amountToShow);

  recentOrders.map(
    (order) =>
      (soldProductQuantity = soldProductQuantity.concat(order.productId))
  );

  const productCountMap = soldProductQuantity.reduce<Record<number, number>>(
    (acc, product) => {
      if (acc[product]) {
        acc[product]++;
      } else {
        acc[product] = 1;
      }
      return acc;
    },
    {}
  );

  const productCounts = Object.entries(productCountMap).map(
    ([productId, count]) => ({
      productId: parseInt(productId), // Convert productId back to number
      count,
    })
  );

  productCounts.sort((a, b) => b.count - a.count);

  const sortedProducts = productCounts.map((item) => item);
  return sortedProducts;
};

export const getProductWithId = (productId: number) => {
  return storeDatabase.products.find((product) => product.id === productId);
};

export const getAllOrders = (userID: number) => {
  return storeDatabase.orders.filter((order) => order.sellerId === userID);
};

export const getCustomerInfo = (customerID: number) => {
  return storeDatabase.clients.find((client) => client.id === customerID);
};

export const getOrderExpense = (userID: number, orderID: number) => {
  return storeDatabase.expenses.find(
    (expense) => expense.sellerId === userID && expense.orderId === orderID
  );
};
