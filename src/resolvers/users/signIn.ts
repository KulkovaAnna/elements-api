import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../config';
import { User } from '../../types/models';
import { ResolverHandler } from '../../types/server';

type Args = {
  email: string;
  password: string;
};

const errorMessage = 'Неправильный email или пароль';

const signIn: ResolverHandler = ({ database }) => {
  return async (_, { email, password }: Args) => {
    const [dbUser]: User[] = await database('users').select().where({ email });
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

    return jwt.sign(user, JWT_SECRET, { expiresIn: '1y' });
  };
};

export default signIn;
