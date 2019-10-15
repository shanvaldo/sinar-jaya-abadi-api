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

      // return productFunctions.findById(rows.map((r) => r.id));

      return productLoader.findById.loadMany(rows.map((r) => r.id));
    },

    subCategories : async (category: TCategoryInstance, { limit }) => {
      const { rows } = await subCategoryFunctions.findIds({
        filterBy: { categoryId: category.id },
        limit,
      });

      // return subCategoryFunctions.findById(rows.map((r) => r.id));

      return subCategoryLoader.findById.loadMany(rows.map((r) => r.id));
    },
  },

  CategoryConnection: {
    edges     : (categoryConnection: IConnection<TCategoryInstance>) => categoryConnection.edges,
    pageInfo  : (categoryConnection: IConnection<TCategoryInstance>) => categoryConnection.pageInfo,
    totalCount: (categoryConnection: IConnection<TCategoryInstance>) => categoryConnection.totalCount,
  },

  Query: {
    categories: async (_1: any, { first: limit = 10, offset = 0 }) => {
      const { rows: messages, totalCount } = await categoryFunction.findIds({ limit, offset });

      const edges = await categoryLoader.findById.loadMany(messages.map(({ id }) => id));
      const pageInfo = pageBuilder(limit, offset, totalCount);

      const response: IConnection<TCategoryInstance> = {
        edges: edges.flatMap((e) => e),
        pageInfo,
        totalCount,
      };

      return response;
    },

    category: async (_1: any, { inputCategory: { categorySlug, categoryId } }) => {
      if (!!categoryId) {
        return categoryLoader.findById.load(categoryId);
        // const [res] = await categoryFunction.findById([categoryId]);

        // return res;
      }

      const category = await categoryFunction.findIds({
        filterBy: { slug: categorySlug },
        limit: 1,
        offset: 0,
      });

      if (!category.totalCount) {
        return null;
      }

      const response = await categoryLoader.findById.load(category.rows[0].id);
      // const [response] = await categoryFunction.findById([category.rows[0].id]);

      return response;
    },
  },

  Mutation: {
    createCategory: async (_1: any, { inputCreateCategory: { name, label = null, description = '' } }, { accessToken }) => {
      await verifyToken(accessToken);

      return categoryFunction.create({
        description,
        label: label || name,
        name: name.toUpperCase(),
      });
    },

    updateCategory: async (_1: any, { categoryId, inputUpdateCategory: { label, description } }, { accessToken }) => {
      await verifyToken(accessToken);

      const updatedCategory = await categoryFunction.update(categoryId, {
        description,
        label,
      });

      await categoryLoader.findById.clear(categoryId);

      return updatedCategory;
    },

    deleteCategory: async (_1: any, { categoryId }, { accessToken }) => {
      await verifyToken(accessToken);

      const deletedCategory = await categoryFunction.delete(categoryId);

      await categoryLoader.findById.clear(categoryId);

      return deletedCategory;
    },
  },
};
