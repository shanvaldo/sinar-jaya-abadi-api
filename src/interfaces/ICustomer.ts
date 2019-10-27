import { TOrderInstance } from '../models/order';

export interface ICustomerAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  email: string;
  fullName: string;
  phone?: string;

  orders?: Array<TOrderInstance>;
}
