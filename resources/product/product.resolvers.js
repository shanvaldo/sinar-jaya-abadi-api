const product = require('./product.functions');
const verifyToken = require('../auth/auth.functions/verify.auth');

module.exports = {
  Query: {
    products: () => product.findAll(),
    product: (_1, { inputProduct: { productId, productSlug } }) => {
      if (!!productId) {
        return product.findById(productId);
      }

      return product.findBySlug(productSlug);
    },
    recommendationProducts: (_1, { inputRecommendationProduct: { productId, categoryId, limit = 10 } }) => product.recommendation(productId, categoryId, limit),
  },

  Mutation: {
    createProduct: async (_1, args, { accessToken }) => {
      await verifyToken(accessToken);

      return product.create({
        name: args.input.name,
        description: args.input.description,
        categoryId: args.input.categoryId,
        subCategoryId: args.input.subCategoryId,
        isAvailable: args.input.isAvailable,
        minOrder: args.input.minOrder,
        price: args.input.price,
        productImages: args.input.productImages,
      });
    },

    updateProduct: async (_1, { productId, inputUpdateProduct }, { accessToken }) => {
      await verifyToken(accessToken);

      return product.update(productId, {
        name: inputUpdateProduct.name,
        description: inputUpdateProduct.description,
        categoryId: inputUpdateProduct.categoryId,
        subCategoryId: inputUpdateProduct.subCategoryId,
        isAvailable: inputUpdateProduct.isAvailable,
        minOrder: inputUpdateProduct.minOrder,
        price: inputUpdateProduct.price,
        productImages: inputUpdateProduct.productImages || [],
      });
    },

    deleteProduct: async (_1, args, { accessToken }) => {
      await verifyToken(accessToken);

      return product.delete(args.productId);
    },
  },
};
