const storeDatabase = {
  userID: 1,
  comission: 10,
  products: [
    { id: 1, name: "Neverfull", brand: "Louis Vuitton", price: 1500 },
    { id: 2, name: "Lady", brand: "Dior", price: 1800 },
    { id: 3, name: "Arque", brand: "Prada", price: 2000 },
    // Add more products as needed
  ],
  clients: [
    { id: 1, name: "Sandra" },
    { id: 2, name: "Ranji" },
    // Add more clients as needed
  ],
  sellers: [
    { id: 1, name: "ნიკოლოზი ჭელიძე", comission: 10 },
    { id: 2, name: "Avto", comission: 10 },
    { id: 3, name: "Gio", comission: 10 },
    // Add more sellers as needed
  ],
  instagrams: [
    { id: 1, name: "Canada", owner: 1 },
    { id: 2, name: "Greece", owner: 2 },
    // Add more Instagram accounts as needed
  ],
  orders: [
    {
      id: 1,
      clientId: 1,
      productId: [1, 2, 3],
      sellerId: 1,
      instagramId: 2,
      total: 1700,
      date: new Date("2024-06-15"), // Example date format: YYYY-MM-DD
    },
    {
      id: 2,
      clientId: 2,
      productId: 2,
      sellerId: 1,
      instagramId: 3,
      total: 100,
      date: new Date("2024-06-17"),
    },
    {
      id: 1,
      clientId: 1,
      productId: 1,
      sellerId: 1,
      instagramId: 2,
      total: 1700,
      date: new Date("2024-06-13"),
    },
    {
      id: 1,
      clientId: 1,
      productId: 1,
      sellerId: 1,
      instagramId: 2,
      total: 1700,
      date: new Date("2024-06-12"),
    },
    {
      id: 1,
      clientId: 1,
      productId: 1,
      sellerId: 1,
      instagramId: 2,
      total: 100,
      date: new Date("2024-06-10"),
    },
    {
      id: 2,
      clientId: 2,
      productId: 2,
      sellerId: 2,
      instagramId: 2,
      total: 1500,
      date: new Date("2024-06-15"),
    },
    // Add more transactions as needed
  ],
  expenses: [
    {
      id: 1,
      orderId: 1,
      sellerId: 1,
      reason: "Size was incorrect",
      amount: 30,
      date: new Date("2024-06-19"),
    },
  ],
};

export default storeDatabase;
