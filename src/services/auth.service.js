import httpStatus from 'http-status';

import { TokenService, UserService } from '#services';
import { Token } from '#models';
import ApiError from '#utils/ApiError';
import { tokenTypes } from '#config/tokens';

class AuthService {
  loginByEmailAndPassword = async (email, password) => {
    const user = await UserService.getByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user;
  };

  logout = async refreshToken => {
    const refreshTokenDoc = await Token.findOne({
      token: refreshToken,
      type: tokenTypes.REFRESH,
      blacklisted: false,
    });
    if (!refreshTokenDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
    }
    await refreshTokenDoc.remove();
  };
}

export default new AuthService();
