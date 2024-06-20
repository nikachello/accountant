import storeDatabase from "../data/MockData";

export const sellerOrders = (
  userID: number,
  startDate?: Date,
  endDate?: Date
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
