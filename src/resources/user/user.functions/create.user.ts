import models from '../../../models';
import passwordManagement from '../../../utils/passwordManagement';

interface IInputCreateUser {
  username: string;
  password: string;
}

export default ({ username, password }) => new Promise(async (resolve, reject) => {
  try {
    const user = await models.User.create({
      password: passwordManagement.hash(password),
      username,
    });

    return resolve(user);
  } catch (error) {
    return reject(error.message || error);
  }
});
