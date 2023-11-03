import { Order } from './Order';

export type CreateOrderInput = Omit<Order, 'id'>;
