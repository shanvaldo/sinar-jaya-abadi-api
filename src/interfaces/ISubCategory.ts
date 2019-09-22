import { TCategoryInstance } from '../models/category';
import { TProductInstance } from '../models/product';

export interface ISubCategoryAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  categoryId: string;

  name: string;
  slug: string;
  label: string;
  description?: string;

  category?: TCategoryInstance;
  products?: Array<TProductInstance>;
}
