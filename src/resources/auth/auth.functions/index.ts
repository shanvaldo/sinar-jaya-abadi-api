import loginAuth from './login.auth';
import refreshTokenAuth from './refreshToken.auth';
import verifyAuth from './verify.auth';

export default Object.freeze({
  login   : loginAuth,
  refresh : refreshTokenAuth,
  verify  : verifyAuth,
});
