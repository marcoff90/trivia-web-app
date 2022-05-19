"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apiError = _interopRequireDefault(require("../error/api-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiErrorHandler = function apiErrorHandler(err, req, res, next) {
  if (err instanceof _apiError["default"]) {
    res.status(err.code).json(err.message);
    return;
  }

  res.status(500).json('Something went wrong');
};

var _default = apiErrorHandler;
exports["default"] = _default;
//# sourceMappingURL=api-error-handler.js.map