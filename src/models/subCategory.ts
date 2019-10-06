import * as Sequelize from 'sequelize';

import { ALIASES } from '../constants';
import { ISubCategoryAttributes } from '../interfaces/ISubCategory';
import { SequelizeAttributes } from '../types';

export type TSubCategoryInstance = Sequelize.Instance<ISubCategoryAttributes> & ISubCategoryAttributes;
export interface ISubCategoryModel extends Sequelize.Model<TSubCategoryInstance, ISubCategoryAttributes> {}

export default (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<ISubCategoryAttributes> = {
    categoryId  : { type: Sequelize.UUID, allowNull: false },
    description : { type: Sequelize.STRING, allowNull: true },
    label       : { type: Sequelize.STRING, allowNull: false },
    name        : { type: Sequelize.STRING, allowNull: false },
    slug        : { type: Sequelize.STRING, allowNull: false },
  };

  const indexes: Array<Sequelize.DefineIndexesOptions> = [{
    fields: ['categoryId', 'name'],
    name  : 'SubCategories_categoryId_name',
    unique: true,
    where : { deletedAt: { [sequelize.Op.ne]: null } },
  }, {
    fields: ['categoryId', 'slug'],
    name  : 'SubCategories_categoryId_slug',
    unique: true,
    where : { deletedAt: { [sequelize.Op.ne]: null } },
  }];

  // tslint:disable-next-line: max-line-length
  const subCategory = sequelize.define<TSubCategoryInstance, ISubCategoryAttributes>('SubCategory', attributes, { indexes, paranoid: true });

  subCategory.associate = (models) => {
    subCategory.belongsTo(models.Category, {
      as          : ALIASES.category,
      foreignKey  : 'categoryId',
      targetKey   : 'id',
    });

    subCategory.hasMany(models.Product, {
      as          : ALIASES.products,
      foreignKey  : 'categoryId',
      sourceKey   : 'id',
    });
  };

  return subCategory;
};
