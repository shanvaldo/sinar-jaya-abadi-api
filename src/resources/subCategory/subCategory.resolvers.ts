import subCategoryFunctions, { subCategoryLoader } from './subCategory.functions';

import { IConnection } from '../../interfaces/IConnection';
import { TSubCategoryInstance } from '../../models/subCategory';
import pageBuilder from '../../utils/pageBuilder';
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
      const { rows } = await productFunctions.findIds({
        filterBy: {
          subCategoryId: subCategory.id,
        },
        limit,
      });

      return productLoader.findById.loadMany(rows.map((r) => r.id));
    },
  },

  Query: {
    subCategories: async (_1, { inputSubCategories: { first: limit = 10, offset = 0 } = {} }) => {
      const { rows: messages, totalCount } = await subCategoryFunctions.findIds({ limit, offset });

      const edges = await subCategoryLoader.findById.loadMany(messages.map(({ id }) => id));
      const pageInfo = pageBuilder(limit, offset, totalCount);

      const response: IConnection<TSubCategoryInstance> = {
        edges,
        pageInfo,
        totalCount,
      };

      return response;
    },

    subCategory: (_1, { inputSubCategory: { subCategoryId } }) => {
      return subCategoryLoader.findById.load(subCategoryId);
    },
  },

  Mutation: {
    createSubCategory: async (_1, { inputCreateSubCategory: { name, categoryId, label = null, description = '' } }, { accessToken }) => {
      await verifyToken(accessToken);

      return subCategoryFunctions.create({
        categoryId,
        description,
        label: label || name,
        name: name.toUpperCase(),
      });
    },

    updateSubCategory: async (_1, { subCategoryId, inputUpdateSubCategory: { label, description } }, { accessToken }) => {
      await verifyToken(accessToken);

      subCategoryLoader.findById.clear(subCategoryId);

      return subCategoryFunctions.update(subCategoryId, {
        description,
        label,
      });
    },

    deleteSubCategory: async (_1, { subCategoryId }, { accessToken }) => {
      await verifyToken(accessToken);

      subCategoryLoader.findById.clear(subCategoryId);

      return subCategoryFunctions.delete(subCategoryId);
    },
  },
};
