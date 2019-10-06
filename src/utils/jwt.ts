import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

import { EXPIRED_IN_HOURS } from '../constants';

const secretKey = process.env.SECRET;
const secretRefreshKey = process.env.SECRET_REFRESH;

const expiredAccessToken = Number(process.env.ACCESS_TOKEN_EXPIRED) || 1;
const expiredRefreshToken = Number(process.env.REFRESH_TOKEN_EXPIRED) || 1;

export default {
  getRefreshToken   : (data: string) => jwt.sign({ data, exp: EXPIRED_IN_HOURS(expiredRefreshToken) }, secretRefreshKey),
  getToken          : (data: string) => jwt.sign({ data, exp: EXPIRED_IN_HOURS(expiredAccessToken) }, secretKey),
  verifyRefreshToken: (token: string) => (<{ data: string }> jwt.verify(token, secretRefreshKey)),
  verifyToken       : (token: string) => jwt.verify(token, secretKey),
};
