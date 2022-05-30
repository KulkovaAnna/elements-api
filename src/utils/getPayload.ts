import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';

const getPayload = (token: string) => {
  try {
    // Verify JWT Token
    const payload = jwt.verify(token, JWT_SECRET);
    return { loggedIn: true, payload };
  } catch (err) {
    // Failed Login Status
    return { loggedIn: false, payload: null };
  }
};

export default getPayload;
