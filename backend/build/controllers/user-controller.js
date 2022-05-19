"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apiError = _interopRequireDefault(require("../error/api-error"));

var _userService = _interopRequireDefault(require("../services/user-service"));

var _tokenGenerator = _interopRequireDefault(require("../utils/token-generator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var storeUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var user, passwordRegex, savedUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = req.body;
            passwordRegex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$";

            if (!(req.body.constructor === Object && Object.keys(req.body).length === 0)) {
              _context.next = 6;
              break;
            }

            next(_apiError["default"].badRequest("User must be defined!"));
            _context.next = 42;
            break;

          case 6:
            if (user.username) {
              _context.next = 10;
              break;
            }

            next(_apiError["default"].badRequest('Username must be defined!'));
            _context.next = 42;
            break;

          case 10:
            if (user.email) {
              _context.next = 14;
              break;
            }

            next(_apiError["default"].badRequest('Email must be defined!'));
            _context.next = 42;
            break;

          case 14:
            if (user.password) {
              _context.next = 18;
              break;
            }

            next(_apiError["default"].badRequest('Password must be defined!'));
            _context.next = 42;
            break;

          case 18:
            if (user.password.match(passwordRegex)) {
              _context.next = 22;
              break;
            }

            next(_apiError["default"].badRequest("Password doesn't match requirements!"));
            _context.next = 42;
            break;

          case 22:
            _context.next = 24;
            return _userService["default"].isUserNameTaken(user.username);

          case 24:
            if (!_context.sent) {
              _context.next = 28;
              break;
            }

            next(_apiError["default"].conflict('Username already taken!'));
            _context.next = 42;
            break;

          case 28:
            _context.next = 30;
            return _userService["default"].isEmailUsed(user.email);

          case 30:
            if (!_context.sent) {
              _context.next = 34;
              break;
            }

            next(_apiError["default"].conflict('Email is already used!'));
            _context.next = 42;
            break;

          case 34:
            if (!(user.username.length < 5)) {
              _context.next = 38;
              break;
            }

            next(_apiError["default"].badRequest('Username must be at least 5 characters!'));
            _context.next = 42;
            break;

          case 38:
            _context.next = 40;
            return _userService["default"].create(user);

          case 40:
            savedUser = _context.sent;
            res.json({
              createdUser: {
                id: savedUser.id,
                username: savedUser.username
              }
            });

          case 42:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function storeUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var showLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var user, loggedUser, token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = req.body;

            if (user.username) {
              _context2.next = 5;
              break;
            }

            next(_apiError["default"].badRequest('Username must be defined!'));
            _context2.next = 21;
            break;

          case 5:
            if (user.password) {
              _context2.next = 9;
              break;
            }

            next(_apiError["default"].badRequest('Password must be defined!'));
            _context2.next = 21;
            break;

          case 9:
            _context2.next = 11;
            return _userService["default"].login(user);

          case 11:
            loggedUser = _context2.sent;

            if (!(loggedUser !== null)) {
              _context2.next = 18;
              break;
            }

            _context2.next = 15;
            return (0, _tokenGenerator["default"])(loggedUser);

          case 15:
            _context2.t0 = _context2.sent;
            _context2.next = 19;
            break;

          case 18:
            _context2.t0 = null;

          case 19:
            token = _context2.t0;

            if (!token) {
              next(_apiError["default"].unauthorized("At least one of the fields doesn't match!"));
            } else {
              if (!loggedUser['active']) {
                next(_apiError["default"].forbidden('Confirm the account through email confirmation!'));
              } else {
                res.json({
                  token: token,
                  username: loggedUser['username'],
                  avatar: loggedUser['avatar'],
                  totalScore: loggedUser['totalScore']
                });
              }
            }

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function showLogin(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var forgottenPassword = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var userEmail, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            userEmail = req.body.email;

            if (userEmail) {
              _context3.next = 5;
              break;
            }

            next(_apiError["default"].badRequest('Email must be defined!'));
            _context3.next = 8;
            break;

          case 5:
            _context3.next = 7;
            return _userService["default"].findByEmail(userEmail);

          case 7:
            user = _context3.sent;

          case 8:
            if (user) {
              _context3.next = 12;
              break;
            }

            next(_apiError["default"].badRequest("Email doesn't match any user"));
            _context3.next = 15;
            break;

          case 12:
            _context3.next = 14;
            return _userService["default"].forgottenPassword(userEmail);

          case 14:
            res.json('Email with reset link sent');

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function forgottenPassword(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var resetPassword = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var userEmail, password, passwordRegex, user, token, timeNow;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userEmail = req.body['email'];
            password = req.body['password'];
            passwordRegex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$";
            token = req.query['token'];
            timeNow = Date.now() / 1000;

            if (token) {
              _context4.next = 9;
              break;
            }

            next(_apiError["default"].badRequest('Reset password token must be provided!'));
            _context4.next = 20;
            break;

          case 9:
            if (userEmail) {
              _context4.next = 13;
              break;
            }

            next(_apiError["default"].badRequest('Email must be defined!'));
            _context4.next = 20;
            break;

          case 13:
            if (password) {
              _context4.next = 17;
              break;
            }

            next(_apiError["default"].badRequest('Password must be defined!'));
            _context4.next = 20;
            break;

          case 17:
            _context4.next = 19;
            return _userService["default"].findByEmail(userEmail);

          case 19:
            user = _context4.sent;

          case 20:
            if (user) {
              _context4.next = 24;
              break;
            }

            next(_apiError["default"].badRequest("User not found"));
            _context4.next = 43;
            break;

          case 24:
            if (!(user['forgottenPasswordToken'] !== token)) {
              _context4.next = 28;
              break;
            }

            next(_apiError["default"].badRequest("Reset token not associated with email address!"));
            _context4.next = 43;
            break;

          case 28:
            if (!_bcrypt["default"].compareSync(password, user['password'])) {
              _context4.next = 32;
              break;
            }

            next(_apiError["default"].badRequest("Password cannot be same as it was!"));
            _context4.next = 43;
            break;

          case 32:
            if (password.match(passwordRegex)) {
              _context4.next = 36;
              break;
            }

            next(_apiError["default"].badRequest("Password doesn't match requirements"));
            _context4.next = 43;
            break;

          case 36:
            if (!(timeNow > user['forgottenPasswordTokenExpiration'])) {
              _context4.next = 40;
              break;
            }

            next(_apiError["default"].badRequest('Token expired!'));
            _context4.next = 43;
            break;

          case 40:
            _context4.next = 42;
            return _userService["default"].resetPassword(userEmail, password);

          case 42:
            res.json('Password changed successfully!');

          case 43:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function resetPassword(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var activateAccount = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
    var confirmationToken, avatar, timeNow, user, newToken, _user, token;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            confirmationToken = req.query['confirmation'];
            avatar = req.body['avatar'];
            timeNow = Date.now() / 1000;

            if (!confirmationToken) {
              next(_apiError["default"].badRequest('Confirmation token must be provided!'));
            }

            if (avatar) {
              _context5.next = 8;
              break;
            }

            next(_apiError["default"].badRequest('Avatar must be provided!'));
            _context5.next = 30;
            break;

          case 8:
            _context5.next = 10;
            return _userService["default"].findByConfirmationToken(confirmationToken);

          case 10:
            user = _context5.sent;
            console.log(user);

            if (user) {
              _context5.next = 16;
              break;
            }

            next(_apiError["default"].notFound('Token not assigned to user!'));
            _context5.next = 30;
            break;

          case 16:
            if (!(timeNow > user['confirmationTokenExpiration'])) {
              _context5.next = 23;
              break;
            }

            _context5.next = 19;
            return _userService["default"].generateNewConfirmationToken(confirmationToken);

          case 19:
            newToken = _context5.sent;

            if (newToken) {
              res.json('Token expired! Check email for new one!');
            }

            _context5.next = 30;
            break;

          case 23:
            _context5.next = 25;
            return _userService["default"].confirmAccount(confirmationToken, avatar);

          case 25:
            _user = _context5.sent;
            _context5.next = 28;
            return (0, _tokenGenerator["default"])(_user);

          case 28:
            token = _context5.sent;
            res.json({
              username: _user['username'],
              active: _user['active'],
              avatar: _user['avatar'],
              totalScore: _user['totalScore'],
              token: token
            });

          case 30:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function activateAccount(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

var welcomeUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
    var confirmationToken, user;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            confirmationToken = req.query['confirmation'];

            if (confirmationToken) {
              _context6.next = 5;
              break;
            }

            next(_apiError["default"].badRequest('Confirmation token must be provided!'));
            _context6.next = 9;
            break;

          case 5:
            _context6.next = 7;
            return _userService["default"].findByConfirmationToken(confirmationToken);

          case 7:
            user = _context6.sent;

            if (!user) {
              next(_apiError["default"].notFound('Token not assigned to user!'));
            } else {
              res.json({
                username: user['username']
              });
            }

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function welcomeUser(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

var identifyUserByResetToken = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res, next) {
    var token, user;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            token = req.query['token'];

            if (token) {
              _context7.next = 5;
              break;
            }

            next(_apiError["default"].badRequest('Token must be provided!'));
            _context7.next = 9;
            break;

          case 5:
            _context7.next = 7;
            return _userService["default"].findByPasswordToken(token);

          case 7:
            user = _context7.sent;

            if (!user) {
              next(_apiError["default"].notFound('Token not assigned to user!'));
            } else {
              res.json('ok');
            }

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function identifyUserByResetToken(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();

var _default = {
  storeUser: storeUser,
  showLogin: showLogin,
  forgottenPassword: forgottenPassword,
  resetPassword: resetPassword,
  activateAccount: activateAccount,
  welcomeUser: welcomeUser,
  identifyUserByResetToken: identifyUserByResetToken
};
exports["default"] = _default;
//# sourceMappingURL=user-controller.js.map