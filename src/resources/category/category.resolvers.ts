import categoryFunction, { categoryLoader } from './category.functions';

import models from '../../models';
import { TCategoryInstance } from '../../models/category';
import verifyToken from '../auth/auth.functions/verify.auth';
import productFunctions, { productLoader } from '../product/product.functions';
import subCategoryFunctions, { subCategoryLoader } from '../subCategory/subCategory.functions';

export default {
  Category: {
    createdAt     : (category: TCategoryInstance) => category.createdAt,
    description   : (category: TCategoryInstance) => category.description,
    id            : (category: TCategoryInstance) => category.id,
    label         : (category: TCategoryInstance) => category.label,
    name          : (category: TCategoryInstance) => category.name,
    slug          : (category: TCategoryInstance) => category.slug,
    updatedAt     : (category: TCategoryInstance) => category.updatedAt,

    products      : async (category: TCategoryInstance, { limit }) => {
      const productIds = await productFunctions.findIds(limit, {
        categoryId: category.id,
        subCategoryId: { [models.Sequelize.Op.eq]: null },
      });

      return productLoader.findById.loadMany(productIds);
    },

    subCategories : async (category: TCategoryInstance, { limit }) => {
      const subCategoryIds = await subCategoryFunctions.findIds(limit, { categoryId: category.id });

      return subCategoryLoader.findById.loadMany(subCategoryIds);
    },
  },

  Query: {
    categories: () => categoryFunction.findAll(),

    category: (_1, { inputCategory: { categoryId, categorySlug } }) => {
      if (!!categoryId) {
        return categoryLoader.findById.load(categoryId);
        // return categoryFunction.findById([categoryId]);
      }

      return categoryLoader.findBySlug.load(categorySlug);
      // return categoryFunction.findBySlug(categorySlug);
    },
  },

  Mutation: {
    createCategory: async (_1, { input: { name, label = null, description = '' } }, { accessToken }) => {
      await verifyToken(accessToken);

      return categoryFunction.create({
        description,
        label: label || name,
        name: name.toUpperCase(),
      });
    },

    updateCategory: async (_1, { categoryId, input: { label, description } }, { accessToken }) => {
      await verifyToken(accessToken);

      return categoryFunction.update(categoryId, {
        description,
        label,
      });
    },

    deleteCategory: async (_1, { categoryId }, { accessToken }) => {
      await verifyToken(accessToken);

      return categoryFunction.delete(categoryId);
    },
  },
};
