const subCategory = require('./subCategory.functions');

module.exports = {
  Query: {
    subCategories: () => subCategory.findAll(),
    subCategory: (_1, { subCategoryId }) => subCategory.findById(subCategoryId),
  },

  Mutation: {
    createSubCategory: (_1, { categoryId, input: { name, label = null, description = '' } }) => subCategory.create({
      categoryId,
      name: name.toUpperCase(),
      label: label || name,
      description,
    }),

    updateSubCategory: (_1, { subCategoryId, input: { label, description } }) => subCategory.update(subCategoryId, {
      label,
      description,
    }),

    deleteSubCategory: (_1, { subCategoryId }) => subCategory.delete(subCategoryId),
  },
};
