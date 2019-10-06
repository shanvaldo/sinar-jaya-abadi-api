import models from '../../../models';

export default () => new Promise(async (resolve, reject) => {
  try {
    const users = await models.User.findAll();

    return resolve(users);
  } catch (error) {
    return reject(error);
  }
});
