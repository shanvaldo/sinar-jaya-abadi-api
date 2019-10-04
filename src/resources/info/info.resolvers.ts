import infoFunctions from './info.functions';

import { TInfoInstance } from '../../models/info';
import verifyToken from '../auth/auth.functions/verify.auth';

export default {
  Info: {
    city        : (info: TInfoInstance) => info.city,
    companyName : (info: TInfoInstance) => info.companyName,
    createdAt   : (info: TInfoInstance) => info.createdAt,
    emails      : (info: TInfoInstance) => info.emails,
    facebook    : (info: TInfoInstance) => info.facebook,
    id          : (info: TInfoInstance) => info.id,
    instagram   : (info: TInfoInstance) => info.instagram,
    linkedIn    : (info: TInfoInstance) => info.linkedIn,
    phones      : (info: TInfoInstance) => info.phones,
    postCode    : (info: TInfoInstance) => info.postCode,
    state       : (info: TInfoInstance) => info.state,
    street      : (info: TInfoInstance) => info.street,
    twitter     : (info: TInfoInstance) => info.twitter,
    updatedAt   : (info: TInfoInstance) => info.updatedAt,
  },

  Query: {
    info: async (_1: any, _2: any, { accessToken }) => {
      await verifyToken(accessToken);

      return infoFunctions.find();
    },
  },

  Mutation: {
    synchronizeInfo: (_1: any, { inputSynchronizeInfo }) => infoFunctions.synch(inputSynchronizeInfo),
  },
};
