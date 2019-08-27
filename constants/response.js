module.exports = Object.freeze({
  error: {
    customer: {
      notExists: new Error('Customer doesn\'t exists'),
    },
    supplier: {
      notExists: new Error('Supplier doesn\'t exists'),
    },
  },
});
