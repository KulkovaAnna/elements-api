import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../config';
import { User } from '../../types/models';
import { ResolverHandler } from '../../types/server';

type Args = {
  email: string;
  password: string;
};

const sugnUp: ResolverHandler = ({ database }) => {
  return async (_, { email, password }: Args) => {
    const [dbUser]: User[] = await database('users').insert(
      {
        email,
        password: await bcrypt.hash(password, 10),
        isAdmin: false,
      },
      '*'
    );
    const user = {
      id: dbUser.id,
      email: dbUser.email,
      isAdmin: dbUser.isAdmin,
    };

    return jwt.sign(user, JWT_SECRET, { expiresIn: '1y' });
  };
};

export default sugnUp;
