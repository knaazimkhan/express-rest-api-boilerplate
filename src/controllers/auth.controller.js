import httpStatus from 'http-status';

import catchAsync from '#utils/catchAsync';
import { AuthService, UserService, TokenService } from '#services';

class AuthController {
  register = catchAsync(async (req, res) => {
    const user = await UserService.create(req.body);
    const tokens = await TokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
  });

  login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await AuthService.loginByEmailAndPassword(email, password);
    const tokens = await TokenService.generateAuthTokens(user);
    res.send({ user, tokens });
  });

  logout = catchAsync(async (req, res) => {
    await AuthService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
  });
}

export default new AuthController();
