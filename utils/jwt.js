require('dotenv').config();

const jwt = require('jsonwebtoken');
const constants = require('../constants');

const secretKey = process.env.SECRET;
const secretRefreshKey = process.env.SECRET_REFRESH;

const expiredAccessToken = process.env.ACCESS_TOKEN_EXPIRED;
const expiredRefreshToken = process.env.REFRESH_TOKEN_EXPIRED;

module.exports = {
  getToken: (data) => jwt.sign({ data, exp: constants.expiredInHours(expiredAccessToken) }, secretKey),
  getRefreshToken: (data) => jwt.sign({ data, exp: constants.expiredInHours(expiredRefreshToken) }, secretRefreshKey),
  verifyToken: (token) => jwt.verify(token, secretKey),
  verifyRefreshToken: (token) => jwt.verify(token, secretRefreshKey),
};
