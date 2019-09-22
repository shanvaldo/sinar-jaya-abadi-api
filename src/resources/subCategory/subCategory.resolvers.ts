import subCategoryFunctions, { subCategoryLoader } from './subCategory.functions';

import { TSubCategoryInstance } from '../../models/subCategory';
import verifyToken from '../auth/auth.functions/verify.auth';
import { categoryLoader } from '../category/category.functions';
import productFunctions, { productLoader } from '../product/product.functions';

export default {
  SubCategory: {
    categoryId    : (subCategory: TSubCategoryInstance) => subCategory.categoryId,
    createdAt     : (subCategory: TSubCategoryInstance) => subCategory.createdAt,
    description   : (subCategory: TSubCategoryInstance) => subCategory.description,
    id            : (subCategory: TSubCategoryInstance) => subCategory.id,
    label         : (subCategory: TSubCategoryInstance) => subCategory.label,
    name          : (subCategory: TSubCategoryInstance) => subCategory.name,
    slug          : (subCategory: TSubCategoryInstance) => subCategory.slug,
    updatedAt     : (subCategory: TSubCategoryInstance) => subCategory.updatedAt,

    category      : (subCategory: TSubCategoryInstance) => categoryLoader.findById.load(subCategory.categoryId),
    products      : async (subCategory: TSubCategoryInstance, { limit }) => {
      const productIds = await productFunctions.findIds(limit, {
        subCategoryId: subCategory.id,
      });

      return productLoader.findById.loadMany(productIds);
    },
  },

  Query: {
    subCategories: async () => {
      const subCategoryIds = await subCategoryFunctions.findIds();

      return subCategoryLoader.findById.loadMany(subCategoryIds);
    },

    subCategory: (_1, { inputSubCategory: { subCategoryId, subCategorySlug } }) => {
      if (!!subCategoryId) {
        return subCategoryFunctions.findById(subCategoryId);
      }

      return subCategoryFunctions.findBySlug(subCategorySlug);
    },
  },

  Mutation: {
    createSubCategory: async (_1, { categoryId, input: { name, label = null, description = '' } }, { accessToken }) => {
      await verifyToken(accessToken);

      return subCategoryFunctions.create({
        categoryId,
        description,
        label: label || name,
        name: name.toUpperCase(),
      });
    },

    updateSubCategory: async (_1, { subCategoryId, input: { label, description } }, { accessToken }) => {
      await verifyToken(accessToken);

      return subCategoryFunctions.update(subCategoryId, {
        description,
        label,
      });
    },

    deleteSubCategory: async (_1, { subCategoryId }, { accessToken }) => {
      await verifyToken(accessToken);

      return subCategoryFunctions.delete(subCategoryId);
    },
  },
};
