const product = require('./product.functions');
const verifyToken = require('../auth/auth.functions/verify.auth');

module.exports = {
  Query: {
    products: () => product.findAll(),
    product: (_1, args) => product.findById(args.productId),
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

    deleteProduct: async (_1, args, { accessToken }) => {
      await verifyToken(accessToken);

      return product.delete(args.productId);
    },
  },
};
