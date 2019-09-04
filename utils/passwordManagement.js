require('dotenv').config();
const crypto = require('crypto');

module.exports = {
  hash: (plainText) => crypto.createHash(process.env.ALGORITHM).update(plainText).digest(process.env.DIGEST),
};
