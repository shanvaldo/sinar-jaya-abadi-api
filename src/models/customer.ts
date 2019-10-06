import * as Sequelize from 'sequelize';

import { ALIASES } from '../constants';
import { ICustomerAttributes } from '../interfaces/ICustomer';
import { SequelizeAttributes } from '../types';

export type TCustomerInstance = Sequelize.Instance<ICustomerAttributes> & ICustomerAttributes;
export interface ICustomerModel extends Sequelize.Model<TCustomerInstance, ICustomerAttributes> {}

export default (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<ICustomerAttributes> = {
    address : { type: Sequelize.STRING, allowNull: true },
    email   : { type: Sequelize.STRING, allowNull: false },
    fullName: { type: Sequelize.STRING, allowNull: false },
    phone   : { type: Sequelize.STRING, allowNull: true },
  };

  const indexes: Array<Sequelize.DefineIndexesOptions> = [];

  const customer = sequelize.define<TCustomerInstance, ICustomerAttributes>('Customer', attributes, { indexes });

  customer.associate = (models) => {
    customer.hasMany(models.Order, {
      as          : ALIASES.orders,
      foreignKey  : 'customerId',
      sourceKey   : 'id',
    });
  };

  return customer;
};
