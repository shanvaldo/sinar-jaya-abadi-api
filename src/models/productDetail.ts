import * as Sequelize from 'sequelize';

import { ALIASES } from '../constants';
import { IProductDetailAttributes } from '../interfaces/IProductDetail';
import { SequelizeAttributes } from '../types';

export type TProductDetailInstance = Sequelize.Instance<IProductDetailAttributes> & IProductDetailAttributes;
export interface IProductDetailModel extends Sequelize.Model<TProductDetailInstance, IProductDetailAttributes> {}

export default (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IProductDetailAttributes> = {
    linkImage : { type: Sequelize.STRING, allowNull: false },
    order     : { type: Sequelize.INTEGER, allowNull: false },
    productId : { type: Sequelize.UUID, allowNull: false },
  };

  const indexes: Array<Sequelize.DefineIndexesOptions> = [{
    fields: ['productId', 'order'],
    name  : 'product_details_product_id_order',
    unique: true,
  }];

  const productDetail = sequelize.define<TProductDetailInstance, IProductDetailAttributes>('ProductDetail', attributes, { indexes });

  productDetail.associate = (models) => {
    productDetail.belongsTo(models.Product, {
      as          : ALIASES.product,
      foreignKey  : 'productId',
      targetKey   : 'id',
    });
  };

  return productDetail;
};
