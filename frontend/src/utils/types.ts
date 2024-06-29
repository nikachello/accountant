export interface Product {
  name: string | undefined;
  price: number | undefined;
  brand: string | undefined;
}

export interface Order {
  _id: number;
  client: {
    name: string;
    mail: string;
    phone: string;
  };

  products: Product[];
  total: number;
  isOrderShipped: boolean;
  isMoneyReceived: boolean;
  date: Date;
  cargoPrice: number;
  orderWeight: number;
  orderPayment: string;
}
