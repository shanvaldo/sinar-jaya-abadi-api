import * as Sequelize from 'sequelize';

import { ALIASES } from '../constants';
import { IPromotionAttributes } from '../interfaces/IPromotion';
import { SequelizeAttributes } from '../types';

export type TPromotionInstance = Sequelize.Instance<IPromotionAttributes> & IPromotionAttributes;
export interface IPromotionModel extends Sequelize.Model<TPromotionInstance, IPromotionAttributes> {}

export default (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IPromotionAttributes> = {
    order     : { type: Sequelize.INTEGER, allowNull: false },
    productId : { type: Sequelize.UUID, allowNull: false },
  };

  const indexes: Array<Sequelize.DefineIndexesOptions> = [{
    fields: ['productId'],
    name  : 'promotions_product_id',
    unique: true,
  }];

  const promotion = sequelize.define<TPromotionInstance, IPromotionAttributes>('Promotion', attributes, { indexes });

  promotion.associate = (models) => {
    promotion.belongsTo(models.Product, {
      as          : ALIASES.product,
      foreignKey  : 'productId',
      targetKey   : 'id',
    });
  };

  return promotion;
};
