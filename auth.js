import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcrypt';

export const createTokens = async (user, secret) => {
  const createToken = jwt.sign(
    {
      user: _.pick(user, ['id', 'isAdmin']),
    },
    secret,
    {
      expiresIn: '20m',
    },
  );

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, 'id'),
    },
    secret,
    {
      expiresIn: '7d',
    },
  );

  return Promise.all([createToken, createRefreshToken]);
};

export const refreshTokens = async (token, refreshToken, models, SECRET) => {
  let userId = -1;
  try {
    const { user: { id } } = jwt.verify(refreshToken, SECRET);
    userId = id;
  } catch (err) {
    return {};
  }

  const user = await models.User.findOne({ where: { id: userId }, raw: true });

  const [newToken, newRefreshToken] = await createTokens(user, SECRET);
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};

export const tryLogin = async (email, password, models, SECRET) => {
  const localAuth = await models.LocalAuth.findOne({ where: { email }, raw: true });
  if (!localAuth) {
    // user with provided email not found
    throw new Error('Invalid login');
  }

  const valid = await bcrypt.compare(password, localAuth.password);
  if (!valid) {
    // bad password
    throw new Error('Invalid login');
  }

  const user = await models.User.findOne({ where: { id: localAuth.user_id }, raw: true });

  const [token, refreshToken] = await createTokens(user, SECRET);

  return {
    token,
    refreshToken,
  };
};
