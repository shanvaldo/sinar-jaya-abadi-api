const category = require('./category.functions');
const verifyToken = require('../auth/auth.functions/verify.auth');

module.exports = {
  Query: {
    categories: () => category.findAll(),
    category: async (_1, { categoryId }) => category.findById(categoryId),
  },

  Mutation: {
    createCategory: async (_1, { input: { name, label = null, description = '' } }, { accessToken }) => {
      await verifyToken(accessToken);

      return category.create({
        name: name.toUpperCase(),
        label: label || name,
        description,
      });
    },

    updateCategory: async (_1, { categoryId, input: { label, description } }, { accessToken }) => {
      await verifyToken(accessToken);

      return category.update(categoryId, {
        label,
        description,
      });
    },

    deleteCategory: async (_1, { categoryId }, { accessToken }) => {
      await verifyToken(accessToken);

      return category.delete(categoryId);
    },
  },
};
