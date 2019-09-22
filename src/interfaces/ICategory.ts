import { TProductInstance } from '../models/product';
import { TSubCategoryInstance } from '../models/subCategory';

export interface ICategoryAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  name: string;
  slug: string;
  label: string;
  description?: string;

  subCategories?: Array<TSubCategoryInstance>;
  products?: Array<TProductInstance>;
}
