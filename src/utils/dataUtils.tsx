import storeDatabase from "../data/MockData";

export const calculateProfitDetails = (userID: number) => {
  //

  const filteredOrders = storeDatabase.orders.filter(
    (order) => order.sellerId === userID
  );

  const totalSales = filteredOrders.reduce(
    (total, order) => total + order.total,
    0
  );

  // const filteredExpenses = storeDatabase.expenses.filter((expense) =>
  //   expense.sellerId === storeDatabase.userId;
  // );

  const filteredExpenses = storeDatabase.expenses.filter(
    (expense) => expense.sellerId === userID
  );

  const totalExpenses = filteredExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const totalSellerProfit = totalSales - totalExpenses;

  const totalProfitFromSeller = totalSales - totalExpenses;

  const totalComissionSeller =
    (totalProfitFromSeller * storeDatabase.comission) / 100;

  const profitDetails = {
    "სულ გაყიდვები": `${totalSales}`,
    "საკომისიოს პროცენტი": `${storeDatabase.comission}%`,
    ხარჯები: `${totalExpenses}`,
    "მოგება გამყიდველისგან": `${totalSellerProfit}`,
    "გამომუშავებული საკომისიო": `${totalComissionSeller}$`,
  };

  return profitDetails;
};
