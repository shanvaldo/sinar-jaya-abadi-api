import categoryFunction, { categoryLoader } from './category.functions';

import { IConnection } from '../../interfaces/IConnection';
import models from '../../models';
import { TCategoryInstance } from '../../models/category';
import verifyToken from '../auth/auth.functions/verify.auth';
import productFunctions, { productLoader } from '../product/product.functions';
import subCategoryFunctions, { subCategoryLoader } from '../subCategory/subCategory.functions';

import pageBuilder from '../../utils/pageBuilder';

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
      const { rows } = await productFunctions.findIds({
        filterBy: {
          categoryId: category.id,
          subCategoryId: { [models.Sequelize.Op.eq]: null },
        },
        limit,
      });

      return productLoader.findBySlug.loadMany(rows.map((r) => r.id));
    },

    subCategories : async (category: TCategoryInstance, { limit }) => {
      const { rows } = await subCategoryFunctions.findIds({
        filterBy: { categoryId: category.id },
        limit,
      });

      return subCategoryLoader.findById.loadMany(rows.map((r) => r.id));
    },
  },

  CategoryConnection: {
    edges     : (categoryConnection: IConnection<TCategoryInstance>) => categoryConnection.edges,
    pageInfo  : (categoryConnection: IConnection<TCategoryInstance>) => categoryConnection.pageInfo,
    totalCount: (categoryConnection: IConnection<TCategoryInstance>) => categoryConnection.totalCount,
  },

  Query: {
    categories: async (_1, { first: limit = 10, offset = 0 }) => {
      const { rows: messages, totalCount } = await categoryFunction.findIds({ limit, offset });

      const edges = await categoryLoader.findById.loadMany(messages.map(({ id }) => id));
      const pageInfo = pageBuilder(limit, offset, totalCount);

      const response: IConnection<TCategoryInstance> = {
        edges,
        pageInfo,
        totalCount,
      };

      return response;
    },

    category: (_1, { inputCategory: { categoryId } }) => categoryLoader.findById.load(categoryId),
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

      const updatedCategory = await categoryFunction.update(categoryId, {
        description,
        label,
      });

      categoryLoader.findById.clear(categoryId);

      return updatedCategory;
    },

    deleteCategory: async (_1, { categoryId }, { accessToken }) => {
      await verifyToken(accessToken);

      const deletedCategory = await categoryFunction.delete(categoryId);

      categoryLoader.findById.clear(categoryId);

      return deletedCategory;
    },
  },
};
