import verifyToken from '../auth/auth.functions/verify.auth';
import promotion from './promotion.functions';

export default {
  Query: {
    promotions: () => promotion.findAll(),
  },

  Mutation: {
    synchronizePromotion: async (_1, { inputSynchronizePromotion }, { accessToken }) => {
      await verifyToken(accessToken);

      return promotion.synch(inputSynchronizePromotion);
    },

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
