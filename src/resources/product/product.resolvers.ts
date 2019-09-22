import productFunctions from './product.functions';

import { TProductInstance } from '../../models/product';
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
    subCategory   : (product: TProductInstance) => subCategoryLoader.findById.load(product.subCategoryId),
  },

  Query: {
    products: () => productFunctions.findAll(),

    product: (_1, { inputProduct: { productId, productSlug } }) => {
      if (!!productId) {
        return productFunctions.findById(productId);
      }

      return productFunctions.findBySlug(productSlug);
    },

    // tslint:disable-next-line: max-line-length
    recommendationProducts: (_1, { inputRecommendationProduct: { productId, categoryId, limit = 10 } }) => productFunctions.recommendation({ productId, categoryId, limit }),
  },

  Mutation: {
    createProduct: async (_1, args, { accessToken }) => {
      await verifyToken(accessToken);

      return productFunctions.create({
        categoryId: args.input.categoryId,
        description: args.input.description,
        isAvailable: args.input.isAvailable,
        minOrder: args.input.minOrder,
        name: args.input.name,
        price: args.input.price,
        productImages: args.input.productImages,
        subCategoryId: args.input.subCategoryId,
      });
    },

    updateProduct: async (_1, { productId, inputUpdateProduct }, { accessToken }) => {
      await verifyToken(accessToken);

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

    deleteProduct: async (_1, args, { accessToken }) => {
      await verifyToken(accessToken);

      return productFunctions.delete(args.productId);
    },

    incrementSeen: (_1, { inputIncrementSeen: { productId } }) => productFunctions.incrementSeen(productId),
  },
};
