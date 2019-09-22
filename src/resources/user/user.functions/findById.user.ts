import models from '../../../models';

export default (id: string) => new Promise(async (resolve, reject) => {
  try {
    const user = await models.User.findOne({ where: { id } });

    return resolve(user);
  } catch (error) {
    return reject(error);
  }
});
