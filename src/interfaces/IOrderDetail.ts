import { TOrderInstance } from '../models/order';
import { TProductInstance } from '../models/product';

export interface IOrderDetailAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  orderId: string;
  productId: string;

  quantity: number;
  totalPrice: number;
  note?: string;

  order?: TOrderInstance;
  product?: TProductInstance;
}
