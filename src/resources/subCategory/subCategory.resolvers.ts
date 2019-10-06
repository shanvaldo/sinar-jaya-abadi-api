import subCategoryFunctions, { subCategoryLoader } from './subCategory.functions';

import { IConnection } from '../../interfaces/IConnection';
import { TSubCategoryInstance } from '../../models/subCategory';
import pageBuilder from '../../utils/pageBuilder';
import verifyToken from '../auth/auth.functions/verify.auth';
import categoryFunctions, { categoryLoader } from '../category/category.functions';
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

    category      : async (subCategory: TSubCategoryInstance) => {
      const [response] = await categoryFunctions.findById([subCategory.categoryId]);

      return response;

      // return categoryLoader.findById.load(subCategory.categoryId);
    },
    products      : async (subCategory: TSubCategoryInstance, { limit }) => {
      const { rows, totalCount } = await productFunctions.findIds({
        filterBy: {
          subCategoryId: subCategory.id,
        },
        limit,
      });

      if (!totalCount) {
        return null;
      }

      return productFunctions.findById(rows.map((r) => r.id));

      // return productLoader.findById.loadMany(rows.map((r) => r.id));
    },
  },

  Query: {
    subCategories: async (_1: any, { inputSubCategories: { first: limit = 10, offset = 0 } = {} }) => {
      const { rows: messages, totalCount } = await subCategoryFunctions.findIds({ limit, offset });

      const edges = await subCategoryFunctions.findById(messages.map(({ id }) => id));
      // const edges = await subCategoryLoader.findById.loadMany(messages.map(({ id }) => id));
      const pageInfo = pageBuilder(limit, offset, totalCount);

      const response: IConnection<TSubCategoryInstance> = {
        edges,
        pageInfo,
        totalCount,
      };

      return response;
    },

    subCategory: async (_1: any, { inputSubCategory: { subCategoryId, subCategorySlug } }) => {
      if (!!subCategoryId) {
        const [res] = await subCategoryFunctions.findById([subCategoryId]);

        return res;
        // return subCategoryLoader.findById.load(subCategoryId);
      }

      const subCategory = await subCategoryFunctions.findIds({
        filterBy: { slug: subCategorySlug },
        limit: 1,
        offset: 0,
      });

      if (!subCategory.totalCount) {
        return null;
      }

      const [response] = await subCategoryFunctions.findById([subCategory.rows[0].id]);

      return response;
      // return subCategoryLoader.findById.load(subCategory.rows[0].id);
    },
  },

  Mutation: {
    // tslint:disable-next-line: max-line-length
    createSubCategory: async (_1: any, { inputCreateSubCategory: { name, categoryId, label = null, description = '' } }, { accessToken }) => {
      await verifyToken(accessToken);

      return subCategoryFunctions.create({
        categoryId,
        description,
        label: label || name,
        name: name.toUpperCase(),
      });
    },

    updateSubCategory: async (_1: any, { subCategoryId, inputUpdateSubCategory: { label, description } }, { accessToken }) => {
      await verifyToken(accessToken);

      subCategoryLoader.findById.clear(subCategoryId);

      return subCategoryFunctions.update(subCategoryId, {
        description,
        label,
      });
    },

    deleteSubCategory: async (_1: any, { subCategoryId }, { accessToken }) => {
      await verifyToken(accessToken);

      subCategoryLoader.findById.clear(subCategoryId);

      return subCategoryFunctions.delete(subCategoryId);
    },
  },
};
