require('dotenv').config();

const jwt = require('jsonwebtoken');
const constants = require('../constants');

const secretKey = process.env.SECRET;
const secretRefreshKey = process.env.SECRET_REFRESH;

module.exports = {
  getToken: (data) => jwt.sign({ data, exp: constants.expiredInHours(1/20) }, secretKey),
  getRefreshToken: (data) => jwt.sign({ data, exp: constants.expiredInHours(24) }, secretRefreshKey),
  verifyToken: (token) => jwt.verify(token, secretKey),
  verifyRefreshToken: (token) => jwt.verify(token, secretRefreshKey),
};
