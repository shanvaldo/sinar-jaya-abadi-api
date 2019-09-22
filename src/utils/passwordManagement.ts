import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const algorithm = process.env.ALGORITHM;

export default {
  hash: (plainText: string) => crypto.createHash(algorithm).update(plainText).digest('base64'),
};
