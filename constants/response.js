module.exports = Object.freeze({
  invalidToken: 'Missing or invalid token',
  error: {
    category: {
      notExists: new Error('Category doesn\'t exists'),
    },
    customer: {
      notExists: new Error('Customer doesn\'t exists'),
    },
    news: {
      notExists: new Error('News doesn\'t exists'),
    },
    orderDetail: {
      notExists: new Error('Order-Detail doesn\'t exists'),
    },
    product: {
      notExists: new Error('Product doesn\'t exists'),
    },
    promotion: {
      noSpace   : new Error('Promotion doesn\'t have empty space'),
      notExists : new Error('Promotion with this product doesn\'t exists'),
    },
    subCategory: {
      notAssociate  : new Error('Sub-Category doesn\'t associate to Category'),
      notExists     : new Error('Sub-Category doesn\'t exists'),
    },
    user: {
      notExists: new Error('User doesn\'t exists'),
    },
  },
});
