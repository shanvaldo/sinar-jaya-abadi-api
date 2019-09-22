import { TProductInstance } from '../models/product';

export interface IProductDetailAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  productId: string;

  linkImage: string;
  order: number;

  product?: TProductInstance;
}
