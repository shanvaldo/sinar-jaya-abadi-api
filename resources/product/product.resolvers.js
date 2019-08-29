const product = require('./product.functions');

module.exports = {
  Query: {
    products: () => product.findAll(),
    product: (_1, args) => product.findById(args.productId),
  },

  Mutation: {
    createProduct: (_1, args) => product.create({
      name: args.input.name,
      description: args.input.description,
      subCategoryId: args.input.subCategoryId,
      isAvailable: args.input.isAvailable,
      weight: args.input.weight,
      minOrder: args.input.minOrder,
      price: args.input.price,
      productImages: args.input.productImages,
    }),

    deleteProduct: (_1, args) => product.delete(args.productId),
  },
};
