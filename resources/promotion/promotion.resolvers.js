const promotion = require('./promotion.functions');
const verifyToken = require('../auth/auth.functions/verify.auth');

module.exports = {
  Query: {
    promotions: () => promotion.findAll(),
  },

  Mutation: {
    createPromotion: async (_1, { inputCreatePromotion: { productId, order } }, { accessToken }) => {
      await verifyToken(accessToken);

      return promotion.create({ productId, order });
    },

    updatePromotion: async (_1, { inputUpdatePromotion: { productId, order } }, { accessToken }) => {
      await verifyToken(accessToken);

      return promotion.update({ productId, order });
    },

    deletePromotion: async (_1, { inputDeletePromotion: { productId } }, { accessToken }) => {
      await verifyToken(accessToken);

      return promotion.delete(productId);
    },
  },
};
