const subCategory = require('./subCategory.functions');
const verifyToken = require('../auth/auth.functions/verify.auth');

module.exports = {
  Query: {
    subCategories: () => subCategory.findAll(),
    subCategory: (_1, { subCategoryId }) => subCategory.findById(subCategoryId),
  },

  Mutation: {
    createSubCategory: async (_1, { categoryId, input: { name, label = null, description = '' } }, { accessToken }) => {
      await verifyToken(accessToken);

      return subCategory.create({
        categoryId,
        name: name.toUpperCase(),
        label: label || name,
        description,
      });
    },

    updateSubCategory: async (_1, { subCategoryId, input: { label, description } }, { accessToken }) => {
      await verifyToken(accessToken);

      return subCategory.update(subCategoryId, {
        label,
        description,
      });
    },

    deleteSubCategory: async (_1, { subCategoryId }, { accessToken }) => {
      await verifyToken(accessToken);

      return subCategory.delete(subCategoryId);
    },
  },
};
