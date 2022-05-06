import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwt_secret } from '../../../config';
import { User } from '../../models';
import { ResolverHandler } from '../../types';

type Args = {
  email: string;
  password: string;
};

const errorMessage = 'Неправильный email или пароль';

const signIn: ResolverHandler = () => {
  return async function (_, { email, password }: Args) {
    const dbUser = await User.findOne({
      where: { email },
    });

    if (!dbUser) {
      throw new Error(errorMessage);
    }

    const valid = await bcrypt.compare(password, dbUser.password);

    if (!valid) {
      throw new Error(errorMessage);
    }

    const user = {
      id: dbUser.id,
      email: dbUser.email,
      isAdmin: dbUser.isAdmin,
    };

    return jwt.sign(user, jwt_secret, { expiresIn: '1y' });
  };
};

export default signIn;
