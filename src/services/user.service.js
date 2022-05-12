import httpStatus from 'http-status';

import { User } from '#models';
import ApiError from '#utils/ApiError';

class UserService {
  create = async userBody => {
    if (await User.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return User.create(userBody);
  };

  query = async (filter, options) => {
    const users = await User.paginate(filter, options);
    return users;
  };

  getById = async id => {
    return User.findById(id);
  };

  getByEmail = async email => {
    return User.findOne({ email });
  };

  updateById = async (userId, updateBody) => {
    const user = await getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
  };

  deleteById = async userId => {
    const user = await getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await user.remove();
    return user;
  };
}

export default new UserService();
