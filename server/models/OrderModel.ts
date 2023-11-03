import { Order } from '../types/Order';

export class OrderRepo {
  orders = [
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

  getAll() {
    return this.orders;
  }

  getSingle(id: number) {
    return this.orders.find((i) => i.id === id);
  }

  createOrder(createData: Order) {
    const id = this.orders.length + 1;
    const newOrder: Order = {
      id: id,
      products: [
        {
          productId: 3,
          quantity: 1,
        },
      ],
    };
    this.orders.push(newOrder);
  }

  updateOrder(id: number, updateData: Order) {
    const foundIndex = this.orders.findIndex((cat) => cat.id === id);
    if (foundIndex !== -1) {
      const updatedOrder = {
        ...this.orders[foundIndex],
        ...updateData,
      };
      this.orders.splice(foundIndex, 1, updatedOrder);
      return updatedOrder;
    }
    return false;
  }
  deleteOrder(id: number) {
    const foundIndex = this.orders.findIndex((ord) => ord.id === id);
    this.orders.splice(foundIndex, 1);
    return foundIndex;
  }
}
