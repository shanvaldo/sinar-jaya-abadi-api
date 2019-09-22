import { TCategoryInstance } from '../models/category';
import { TOrderDetailInstance } from '../models/orderDetail';
import { TProductDetailInstance } from '../models/productDetail';
import { TPromotionInstance } from '../models/promotion';
import { TSubCategoryInstance } from '../models/subCategory';

export interface IProductAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  categoryId: string;
  subCategoryId?: string;

  name: string;
  slug: string;
  description?: string;
  sold?: number;
  seen?: number;
  isAvailable: boolean;
  weight?: number;
  minOrder: number;
  price: number;

  category?: TCategoryInstance;
  subCategory?: TSubCategoryInstance;
  orderDetails?: Array<TOrderDetailInstance>;
  promotions?: Array<TPromotionInstance>;
  productImages?: Array<TProductDetailInstance>;
}
