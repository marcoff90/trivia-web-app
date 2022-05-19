"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

require("dotenv/config");

var _apiError = _interopRequireDefault(require("../error/api-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authorizationMiddleware = function authorizationMiddleware(req, res, next) {
  var token = req.headers["authorization"];

  if (!token) {
    next(_apiError["default"].unauthorized('Access denied! No token provided!'));
  } else {
    token = token.split(' ')[1];
  }

  try {
    req.user = _jsonwebtoken["default"].verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (ex) {
    next(_apiError["default"].badRequest('Invalid token!'));
  }
};

var _default = authorizationMiddleware;
exports["default"] = _default;
//# sourceMappingURL=authorization-middleware.js.map