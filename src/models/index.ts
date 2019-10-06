import Sequelize from 'sequelize';

import category from './category';
import customer from './customer';
import info from './info';
import news from './news';
import order from './order';
import orderDetail from './orderDetail';
import product from './product';
import productDetail from './productDetail';
import promotion from './promotion';
import subCategory from './subCategory';
import user from './user';

import config from '../../config/config';

const env = process.env.NODE_ENV || 'dev';
const dbConnection = config[env];

const sequelize = new Sequelize(
  dbConnection.database,
  dbConnection.username,
  dbConnection.password,
  {
    benchmark: false,
    // tslint:disable-next-line: no-console
    logging: env === 'dev' ? console.log : false,
    timezone: '+07:00',
    ...dbConnection,
  },
);

const db = {
  Category      : category(sequelize),
  Customer      : customer(sequelize),
  Info          : info(sequelize),
  News          : news(sequelize),
  Order         : order(sequelize),
  OrderDetail   : orderDetail(sequelize),
  Product       : product(sequelize),
  ProductDetail : productDetail(sequelize),
  Promotion     : promotion(sequelize),
  SubCategory   : subCategory(sequelize),
  User          : user(sequelize),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default { ...db, Sequelize, sequelize };
