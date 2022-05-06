import bcrypt from 'bcrypt';
import { jwt_secret } from '../../../config';
import jwt from 'jsonwebtoken';
import { User } from '../../models';
import { ResolverHandler } from '../../types';

type Args = {
  email: string;
  password: string;
};

const sugnUp: ResolverHandler = () => {
  return async function (_, { email, password }: Args) {
    const dbUser = await User.create({
      email,
      password: await bcrypt.hash(password, 10),
      isAdmin: false,
    });

    const user = {
      id: dbUser.id,
      email: dbUser.email,
      isAdmin: dbUser.isAdmin,
    };

    return jwt.sign(user, jwt_secret, { expiresIn: '1y' });
  };
};

export default sugnUp;
