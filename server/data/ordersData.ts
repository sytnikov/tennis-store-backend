import { Order } from '../types/Order';

export const ordersData: Order[] = [
  {
    id: 1,
    products: [
      {
        productId: 1,
        quantity: 2,
      },
    ],
  },
  {
    id: 2,
    products: [
      {
        productId: 2,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 1,
      },
    ],
  },
];
