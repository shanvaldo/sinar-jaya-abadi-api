const category = require('./category.functions');

module.exports = {
  Query: {
    categories: () => category.findAll(),
    category: (_1, { categoryId }) => category.findById(categoryId),
  },

  Mutation: {
    createCategory: (_1, { input: { name, label = null, description = '' } }) => category.create({
      name: name.toUpperCase(),
      label: label || name,
      description,
    }),

    updateCategory: (_1, { categoryId, input: { label, description } }) => category.update(categoryId, {
      label,
      description,
    }),

    deleteCategory: (_1, { categoryId }) => category.delete(categoryId),
  },
};
