import * as Sequelize from 'sequelize';

import { ALIASES } from '../constants';
import { IProductAttributes } from '../interfaces/IProduct';
import { SequelizeAttributes } from '../types';

export type TProductInstance = Sequelize.Instance<IProductAttributes> & IProductAttributes;
export interface IProductModel extends Sequelize.Model<TProductInstance, IProductAttributes> {}

export default (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IProductAttributes> = {
    categoryId    : { type: Sequelize.UUID, allowNull: false },
    description   : { type: Sequelize.TEXT, allowNull: true },
    isAvailable   : { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
    minOrder      : { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
    name          : { type: Sequelize.STRING, allowNull: false },
    price         : { type: Sequelize.INTEGER, allowNull: false },
    seen          : { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    slug          : { type: Sequelize.STRING, allowNull: false },
    sold          : { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    subCategoryId : { type: Sequelize.UUID, allowNull: true },
    weight        : { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  };

  const indexes: Array<Sequelize.DefineIndexesOptions> = [{
    fields: ['name'],
    name  : 'products_name',
    unique: true,
    where : { deletedAt: { [sequelize.Op.ne]: null } },
  }, {
    fields: ['slug'],
    name  : 'products_slug',
    unique: true,
    where : { deletedAt: { [sequelize.Op.ne]: null } },
  }];

  const product = sequelize.define<TProductInstance, IProductAttributes>('Product', attributes, { indexes });

  product.associate = (models) => {
    product.belongsTo(models.Category, {
      as          : ALIASES.category,
      foreignKey  : 'categoryId',
      targetKey   : 'id',
    });

    product.belongsTo(models.SubCategory, {
      as          : ALIASES.subCategory,
      foreignKey  : 'subCategoryId',
      targetKey   : 'id',
    });

    product.hasMany(models.OrderDetail, {
      as          : ALIASES.orderDetails,
      foreignKey  : 'productId',
      sourceKey   : 'id',
    });

    product.hasMany(models.ProductDetail, {
      as          : ALIASES.productImages,
      foreignKey  : 'productId',
      sourceKey   : 'id',
    });

    product.hasOne(models.Promotion, {
      as          : ALIASES.promotion,
      foreignKey  : 'productId',
    });
  };

  return product;
};
