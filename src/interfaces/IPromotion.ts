import { TProductInstance } from '../models/product';

export interface IPromotionAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  productId: string;

  order: number;

  product?: TProductInstance;
}
