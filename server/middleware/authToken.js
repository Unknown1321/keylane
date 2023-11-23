import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import crypto from 'crypto';


const secretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Middleware to generate and sign the token
const generateToken = (user) => {
    const token = jwt.sign({ _id: user._id, username: user.username }, secretKey, { expiresIn: '1h' });
    return token;
};

// Middleware to verify the token
const authenticateToken = expressJwt({ secret: secretKey, algorithms: ['HS256'] });

// Export the middleware functions
export { generateToken, authenticateToken };