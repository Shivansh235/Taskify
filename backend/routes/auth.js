// middleware/auth.js

import jwt from 'jsonwebtoken';

const AuthenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'You are not authenticated!' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'defaultSecret';
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // Attach user data (e.g., { id, username }) to request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export default AuthenticateToken;
