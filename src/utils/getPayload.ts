import jwt from 'jsonwebtoken';
import { jwt_secret } from '../../config';

const getPayload = (token: string) => {
  try {
    // Verify JWT Token
    const payload = jwt.verify(token, jwt_secret);
    return { loggedIn: true, payload };
  } catch (err) {
    // Failed Login Status
    return { loggedIn: false, payload: null };
  }
};

export default getPayload;
