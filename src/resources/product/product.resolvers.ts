import productFunctions, { productLoader } from './product.functions';

import { IConnection } from '../../interfaces/IConnection';
import { TProductInstance } from '../../models/product';
import pageBuilder from '../../utils/pageBuilder';
import verifyToken from '../auth/auth.functions/verify.auth';
import { categoryLoader } from '../category/category.functions';
import { subCategoryLoader } from '../subCategory/subCategory.functions';

export default {
  Product: {
    categoryId    : (product: TProductInstance) => product.categoryId,
    createdAt     : (product: TProductInstance) => product.createdAt,
    description   : (product: TProductInstance) => product.description,
    id            : (product: TProductInstance) => product.id,
    isAvailable   : (product: TProductInstance) => product.isAvailable,
    minOrder      : (product: TProductInstance) => product.minOrder,
    name          : (product: TProductInstance) => product.name,
    price         : (product: TProductInstance) => product.price,
    seen          : (product: TProductInstance) => product.seen,
    slug          : (product: TProductInstance) => product.slug,
    sold          : (product: TProductInstance) => product.sold,
    subCategoryId : (product: TProductInstance) => product.subCategoryId,
    updatedAt     : (product: TProductInstance) => product.updatedAt,

    category      : (product: TProductInstance) => categoryLoader.findById.load(product.categoryId),
    productImages : (product: TProductInstance) => product.productImages,
    subCategory   : (product: TProductInstance) => {
      if (!product.subCategoryId) {
        return null;
      }

      return subCategoryLoader.findById.load(product.subCategoryId);
    },
  },

  Query: {
    products: async (_1: any, { inputProducts: { first: limit = 10, offset = 0, sort = {} } = {} }) => {
      const { rows: messages, totalCount } = await productFunctions.findIds({ limit, offset, sortBy: sort });

      const edges = await productLoader.findById.loadMany(messages.map(({ id }) => id));
      const pageInfo = pageBuilder(limit, offset, totalCount);

      const response: IConnection<TProductInstance> = {
        edges,
        pageInfo,
        totalCount,
      };

      return response;
    },

    product: async (_1: any, { inputProduct: { productId, productSlug } }) => {
      if (!!productId) {
        return productLoader.findById.load(productId);
      }

      const product = await productFunctions.findIds({
        filterBy: { slug: productSlug },
        limit: 1,
        offset: 0,
      });

      if (!product.totalCount) {
        return null;
      }

      return productLoader.findById.load(product.rows[0].id);
    },

    searchProducts: async (_1: any, { inputSearchProduct: { name = '' } }) => {
      const productIds = await productFunctions.search(name);

      return productLoader.findById.loadMany(productIds);
    },

    recommendationProducts: (_1: any, { inputRecommendationProduct: { productId, categoryId, limit = 10 } }) => {
      return productFunctions.recommendation({ productId, categoryId, limit });
    },
  },

  Mutation: {
    createProduct: async (_1: any, { inputCreateProduct }, { accessToken }) => {
      await verifyToken(accessToken);

      return productFunctions.create({
        categoryId: inputCreateProduct.categoryId,
        description: inputCreateProduct.description,
        isAvailable: inputCreateProduct.isAvailable,
        minOrder: inputCreateProduct.minOrder,
        name: inputCreateProduct.name,
        price: inputCreateProduct.price,
        productImages: inputCreateProduct.productImages,
        subCategoryId: inputCreateProduct.subCategoryId,
      });
    },

    updateProduct: async (_1: any, { productId, inputUpdateProduct }, { accessToken }) => {
      await verifyToken(accessToken);

      productLoader.findById.clear(productId);

      return productFunctions.update(productId, {
        categoryId: inputUpdateProduct.categoryId,
        description: inputUpdateProduct.description,
        isAvailable: inputUpdateProduct.isAvailable,
        minOrder: inputUpdateProduct.minOrder,
        name: inputUpdateProduct.name,
        price: inputUpdateProduct.price,
        productImages: inputUpdateProduct.productImages || [],
        subCategoryId: inputUpdateProduct.subCategoryId,
      });
    },

    deleteProduct: async (_1: any, { productId }, { accessToken }) => {
      await verifyToken(accessToken);

      productLoader.findById.clear(productId);

      return productFunctions.delete(productId);
    },

    incrementSeen: (_1: any, { productId }) => {
      productLoader.findById.clear(productId);

      return productFunctions.incrementSeen(productId);
    },
  },
};
