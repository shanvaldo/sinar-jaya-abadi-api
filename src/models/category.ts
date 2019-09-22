import * as Sequelize from 'sequelize';

import { ALIASES } from '../constants';
import { ICategoryAttributes } from '../interfaces/ICategory';
import { SequelizeAttributes } from '../types';

export type TCategoryInstance = Sequelize.Instance<ICategoryAttributes> & ICategoryAttributes;
export interface ICategoryModel extends Sequelize.Model<TCategoryInstance, ICategoryAttributes> {}

export default (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<ICategoryAttributes> = {
    description : { type: Sequelize.STRING, allowNull: true },
    label       : { type: Sequelize.STRING, allowNull: false },
    name        : { type: Sequelize.STRING, allowNull: false },
    slug        : { type: Sequelize.STRING, allowNull: false },
  };

  const indexes: Array<Sequelize.DefineIndexesOptions> = [{
    fields: ['name'],
    name  : 'categories_name',
    unique: true,
    where : { deletedAt: { [sequelize.Op.ne]: null } },
  }, {
    fields: ['slug'],
    name  : 'categories_slug',
    unique: true,
    where : { deletedAt: { [sequelize.Op.ne]: null } },
  }];

  const category = sequelize.define<TCategoryInstance, ICategoryAttributes>('Category', attributes, { indexes, paranoid: true });

  category.associate = (models) => {
    category.hasMany(models.SubCategory, {
      as          : ALIASES.subCategories,
      foreignKey  : 'categoryId',
      sourceKey   : 'id',
    });

    category.hasMany(models.Product, {
      as          : ALIASES.products,
      foreignKey  : 'categoryId',
      sourceKey   : 'id',
    });
  };

  return category;
};
