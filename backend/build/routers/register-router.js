"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _userController = _interopRequireDefault(require("../controllers/user-controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RegisterRouter = (0, _express.Router)();
RegisterRouter.post('/api/registration', _userController["default"].storeUser);
RegisterRouter.post('/api/login', _userController["default"].showLogin);
RegisterRouter.post('/api/users/forgotten-password', _userController["default"].forgottenPassword);
RegisterRouter.post('/api/users/recover', _userController["default"].resetPassword);
RegisterRouter.post('/api/users/activate', _userController["default"].activateAccount);
RegisterRouter.get('/api/users/welcome', _userController["default"].welcomeUser);
RegisterRouter.get('/api/users/identify', _userController["default"].identifyUserByResetToken);
var _default = RegisterRouter;
exports["default"] = _default;
//# sourceMappingURL=register-router.js.map