import { TCustomerInstance } from '../models/customer';
import { TOrderDetailInstance } from '../models/orderDetail';

export interface IOrderAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  customerId: string;

  code: string;
  totalPrice: number;

  customer?: TCustomerInstance;
  orderDetails?: Array<TOrderDetailInstance>;
}
