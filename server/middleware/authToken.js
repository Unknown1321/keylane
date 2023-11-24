import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import crypto from 'crypto';


const secretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const generateToken = (user) => {
    const token = jwt.sign({ _id: user._id, username: user.username }, secretKey, { expiresIn: '1h' });
    return token;
};

const authenticateToken = expressJwt({ secret: secretKey, algorithms: ['HS256'] });

export { generateToken, authenticateToken };