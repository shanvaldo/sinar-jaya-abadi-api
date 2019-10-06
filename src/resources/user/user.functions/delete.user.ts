import { RESPONSE } from '../../../constants';
import models from '../../../models';

export default (id: string) => new Promise(async (resolve, reject) => {
  try {
    const user = await models.User.findOne({ where: { id } });

    if (!user) {
      return reject(RESPONSE.error.user.notExists);
    }

    await user.destroy();

    return resolve(user);
  } catch (error) {
    return reject(error);
  }
});
