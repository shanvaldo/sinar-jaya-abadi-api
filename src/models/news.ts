import * as Sequelize from 'sequelize';

import { INewsAttributes } from '../interfaces/INews';
import { SequelizeAttributes } from '../types';

export type TNewsInstance = Sequelize.Instance<INewsAttributes> & INewsAttributes;
export interface INewsModel extends Sequelize.Model<TNewsInstance, INewsAttributes> {}

export default (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<INewsAttributes> = {
    content   : { type: Sequelize.STRING, allowNull: true },
    coverImage: { type: Sequelize.STRING, allowNull: false },
    slug      : { type: Sequelize.STRING, allowNull: false },
    title     : { type: Sequelize.STRING, allowNull: false },
  };

  const indexes: Array<Sequelize.DefineIndexesOptions> = [{
    fields: ['title'],
    name  : 'News_title',
    unique: true,
  }, {
    fields: ['slug'],
    name  : 'News_slug',
    unique: true,
  }];

  const news = sequelize.define<TNewsInstance, INewsAttributes>('News', attributes, { indexes });

  return news;
};
