import * as Sequelize from 'sequelize';

import { IInfoAttributes } from '../interfaces/IInfo';
import { SequelizeAttributes } from '../types';

export type TInfoInstance = Sequelize.Instance<IInfoAttributes> & IInfoAttributes;
export interface IInfoModel extends Sequelize.Model<TInfoInstance, IInfoAttributes> {}

export default (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IInfoAttributes> = {
    city        : { type: Sequelize.STRING, allowNull: true },
    companyName : { type: Sequelize.STRING, allowNull: false },
    emails      : { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: false },
    facebook    : { type: Sequelize.STRING, allowNull: true },
    instagram   : { type: Sequelize.STRING, allowNull: true },
    linkedIn    : { type: Sequelize.STRING, allowNull: true },
    phones      : { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: false },
    postCode    : { type: Sequelize.STRING, allowNull: true },
    state       : { type: Sequelize.STRING, allowNull: true },
    street      : { type: Sequelize.STRING, allowNull: true },
    twitter     : { type: Sequelize.STRING, allowNull: true },
  };

  const info = sequelize.define<TInfoInstance, IInfoAttributes>('CompanyInformation', attributes);

  return info;
};
