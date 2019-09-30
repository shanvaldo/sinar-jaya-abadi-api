import verifyToken from '../auth/auth.functions/verify.auth';
import { productLoader } from '../product/product.functions';
import promotionFunction from './promotion.functions';

export default {
  Query: {
    promotions: async () => {
      const productIds = await promotionFunction.findProductIds();

      return productLoader.findById.loadMany(productIds);
    },
  },

  Mutation: {
    synchronizePromotion: async (_1, { inputSynchronizePromotion }, { accessToken }) => {
      await verifyToken(accessToken);

      return promotionFunction.synch(inputSynchronizePromotion);
    },

    createPromotion: async (_1, { inputCreatePromotion: { productId, order } }, { accessToken }) => {
      await verifyToken(accessToken);

      return promotionFunction.create({ productId, order });
    },

    updatePromotion: async (_1, { inputUpdatePromotion: { productId, order } }, { accessToken }) => {
      await verifyToken(accessToken);

      return promotionFunction.update({ productId, order });
    },

    deletePromotion: async (_1, { inputDeletePromotion: { productId } }, { accessToken }) => {
      await verifyToken(accessToken);

      return promotionFunction.delete(productId);
    },
  },
};
