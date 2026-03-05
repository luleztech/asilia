/**
 * Dr.Job - JWT middleware (optional auth for protected routes)
 */
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'drjob-secret-change-in-production';

function sign(payload) {
  return jwt.sign(
    payload,
    secret,
    { expiresIn: '30d' }
  );
}

function verify(token) {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

function getBearerToken(req) {
  const auth = req.headers.authorization || '';
  const match = auth.match(/Bearer\s+(\S+)/);
  return match ? match[1] : null;
}

function requireAuth(req, res, next) {
  const token = getBearerToken(req);
  if (!token) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  const payload = verify(token);
  if (!payload) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
  req.user = payload;
  next();
}

module.exports = { sign, verify, getBearerToken, requireAuth };
