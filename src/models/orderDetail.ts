import * as Sequelize from 'sequelize';

import { ALIASES } from '../constants';
import { IOrderDetailAttributes } from '../interfaces/IOrderDetail';
import { SequelizeAttributes } from '../types';

export type TOrderDetailInstance = Sequelize.Instance<IOrderDetailAttributes> & IOrderDetailAttributes;
export interface IOrderDetailModel extends Sequelize.Model<TOrderDetailInstance, IOrderDetailAttributes> {}

export default (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IOrderDetailAttributes> = {
    note      : { type: Sequelize.STRING, allowNull: true },
    orderId   : { type: Sequelize.UUID, allowNull: false },
    productId : { type: Sequelize.UUID, allowNull: false },
    quantity  : { type: Sequelize.INTEGER, allowNull: false },
    totalPrice: { type: Sequelize.INTEGER, allowNull: false },
  };

  const indexes: Array<Sequelize.DefineIndexesOptions> = [{
    fields: ['productId', 'orderId'],
    name  : 'order_details_product_id_order_id',
    unique: true,
  }];

  const orderDetail = sequelize.define<TOrderDetailInstance, IOrderDetailAttributes>('OrderDetail', attributes, { indexes });

  orderDetail.associate = (models) => {
    orderDetail.belongsTo(models.Order, {
      as          : ALIASES.order,
      foreignKey  : 'orderId',
      targetKey   : 'id',
    });

    orderDetail.belongsTo(models.Product, {
      as          : ALIASES.product,
      foreignKey  : 'productId',
      targetKey   : 'id',
    });
  };

  return orderDetail;
};
