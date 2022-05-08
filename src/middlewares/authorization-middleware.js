import jwt from 'jsonwebtoken';
import 'dotenv/config';
import ApiError from "../error/api-error";

const authorizationMiddleware = (req, res, next) => {

  let token = req.headers["authorization"];

  if (!token) {
    next(ApiError.unauthorized('Access denied! No token provided!'));
  } else {
    token = token.split(' ')[1];
  }

  try {
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();

  } catch (ex) {
    next(ApiError.badRequest('Invalid token!'));
  }
};

export default authorizationMiddleware;
