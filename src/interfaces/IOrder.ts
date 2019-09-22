import { TCustomerInstance } from '../models/customer';

export interface IOrderAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  customerId: string;

  totalPrice: number;

  customer?: TCustomerInstance;
}
