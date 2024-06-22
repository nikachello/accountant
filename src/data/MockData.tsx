const storeDatabase = {
  userID: 1,
  comission: 10,
  products: [
    {
      id: 1,
      name: "Neverfull",
      brand: "Louis Vuitton",
      price: 1500,
      img: "https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-neverfull-mm-monogram-canvas-handbags--M46987_PM2_Front%20view.png?wid=1090&hei=1090",
    },
    {
      id: 2,
      name: "Lady",
      brand: "Dior",
      price: 1800,
      img: "https://api.platforme.com/api/compose?brand=dior&model=my_lady_dior_cuir&version=686&p=base:cuir:noir_em900&initials=&size=720",
    },
    {
      id: 3,
      name: "Arque",
      brand: "Prada",
      price: 2000,
      img: "https://www.prada.com/content/dam/pradabkg_products/1/1BC/1BC194/ASKF0XUG/1BC194_ASK_F0XUG_V_OOO_SLF.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1000.1000.jpg",
    },
    // Add more products as needed
  ],
  clients: [
    {
      id: 1,
      name: "Sandra",
      email: "Sandra@gmail.com",
      phoneNum: "+156894518542",
    },
    {
      id: 2,
      name: "Ranji",
      email: "Ranji@gmail.com",
      phoneNum: "+176864558512",
    },
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
      date: new Date("2024-06-08"),
      isShipped: true,
      weight: 1.5,
      paymentType: "PayPal",
      isMoneyReceived: true,
      totalCargo: 70,
    },
    {
      id: 2,
      clientId: 2,
      productId: 2,
      sellerId: 1,
      instagramId: 1,
      total: 100,
      date: new Date("2024-06-10"),
      isShipped: true,
      weight: 1.5,
      paymentType: "PayPal",
      isMoneyReceived: true,
      totalCargo: 70,
    },
    {
      id: 3,
      clientId: 1,
      productId: 1,
      sellerId: 1,
      instagramId: 1,
      total: 1700,
      date: new Date("2024-06-12"),
      isShipped: true,
      weight: 1.5,
      paymentType: "PayPal",
      isMoneyReceived: true,
      totalCargo: 60,
    },
    {
      id: 4,
      clientId: 1,
      productId: 1,
      sellerId: 1,
      instagramId: 1,
      total: 1700,
      date: new Date("2024-06-14"),
      isShipped: true,
      weight: 1.5,
      paymentType: "PayPal",
      isMoneyReceived: true,
      totalCargo: 55,
    },
    {
      id: 5,
      clientId: 1,
      productId: 1,
      sellerId: 1,
      instagramId: 1,
      total: 100,
      date: new Date("2024-06-16"),
      isShipped: true,
      weight: 1.5,
      paymentType: "Western",
      isMoneyReceived: true,
      totalCargo: 75,
    },
    {
      id: 6,
      clientId: 2,
      productId: 2,
      sellerId: 1,
      instagramId: 1,
      total: 1500,
      date: new Date("2024-06-18"),
      isShipped: true,
      weight: 1.5,
      paymentType: "PayPal",
      isMoneyReceived: true,
      totalCargo: 95,
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
