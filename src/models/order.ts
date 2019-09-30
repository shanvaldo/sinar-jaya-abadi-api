import * as Sequelize from 'sequelize';

import { ALIASES } from '../constants';
import { IOrderAttributes } from '../interfaces/IOrder';
import { SequelizeAttributes } from '../types';

export type TOrderInstance = Sequelize.Instance<IOrderAttributes> & IOrderAttributes;
export interface IOrderModel extends Sequelize.Model<TOrderInstance, IOrderAttributes> {}

export default (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IOrderAttributes> = {
    code      : { type: Sequelize.STRING, allowNull: false },
    customerId: { type: Sequelize.UUID, allowNull: false },
    totalPrice: { type: Sequelize.INTEGER, allowNull: false },
  };

  const indexes: Array<Sequelize.DefineIndexesOptions> = [];

  const order = sequelize.define<TOrderInstance, IOrderAttributes>('Order', attributes, { indexes });

  order.associate = (models) => {
    order.belongsTo(models.Customer, {
      as          : ALIASES.customer,
      foreignKey  : 'customerId',
      targetKey   : 'id',
    });

    order.hasMany(models.OrderDetail, {
      as          : ALIASES.orderDetails,
      foreignKey  : 'orderId',
      sourceKey   : 'id',
    });
  };

  return order;
};
