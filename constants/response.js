module.exports = Object.freeze({
  error: {
    category: {
      notExists: new Error('Category doesn\'t exists'),
    },
    customer: {
      notExists: new Error('Customer doesn\'t exists'),
    },
    product: {
      notExists: new Error('Product doesn\'t exists'),
    },
    subCategory: {
      notExists: new Error('Sub-Category doesn\'t exists'),
    },
  },
});
