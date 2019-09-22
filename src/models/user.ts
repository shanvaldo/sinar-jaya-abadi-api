import * as Sequelize from 'sequelize';

import { IUserAttributes } from '../interfaces/IUser';
import { SequelizeAttributes } from '../types';

export type TUserInstance = Sequelize.Instance<IUserAttributes> & IUserAttributes;
export interface IUserModel extends Sequelize.Model<TUserInstance, IUserAttributes> {}

export default (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IUserAttributes> = {
    password : { type: Sequelize.STRING, allowNull: false },
    username : { type: Sequelize.STRING, allowNull: false },
  };

  const indexes: Array<Sequelize.DefineIndexesOptions> = [{
    fields: ['username'],
    name  : 'Users_username',
    unique: true,
  }];

  const user = sequelize.define<TUserInstance, IUserAttributes>('User', attributes, { indexes });

  return user;
};
