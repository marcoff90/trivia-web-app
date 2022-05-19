"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _userRepository = _interopRequireDefault(require("../repositories/user-repository"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _passwordToken = _interopRequireDefault(require("../utils/password-token"));

var _mailer = _interopRequireDefault(require("../utils/mailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var create = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user) {
    var token, expiration, savedUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user.password = _bcrypt["default"].hashSync(user['password'], 5);
            _context.next = 3;
            return _passwordToken["default"].generateConfirmationToken();

          case 3:
            token = _context.sent;
            expiration = Math.round(Date.now() / 1000 + 86400);
            user['confirmationToken'] = token;
            user['confirmationTokenExpiration'] = expiration;
            _context.next = 9;
            return _userRepository["default"].create(user);

          case 9:
            savedUser = _context.sent;

            _mailer["default"].sendConfirmationMail(user.email, token, user.username);

            return _context.abrupt("return", savedUser);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function create(_x) {
    return _ref.apply(this, arguments);
  };
}();

var confirmAccount = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(confirmationToken, avatar) {
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _userRepository["default"].findByConfirmationToken(confirmationToken);

          case 2:
            user = _context2.sent;
            user['active'] = true;
            user['avatar'] = avatar;
            user['confirmationToken'] = null;
            user['confirmationTokenExpiration'] = null;
            _context2.next = 9;
            return user.save();

          case 9:
            return _context2.abrupt("return", user);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function confirmAccount(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var generateNewConfirmationToken = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(confirmationToken) {
    var user, token, expiration;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _userRepository["default"].findByConfirmationToken(confirmationToken);

          case 2:
            user = _context3.sent;
            _context3.next = 5;
            return _passwordToken["default"].generateConfirmationToken();

          case 5:
            token = _context3.sent;
            expiration = Math.round(Date.now() / 1000 + 86400);
            user['confirmationToken'] = token;
            user['confirmationTokenExpiration'] = expiration;

            _mailer["default"].sendConfirmationMail(user.email, token, user.username);

            _context3.next = 12;
            return user.save();

          case 12:
            return _context3.abrupt("return", token);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function generateNewConfirmationToken(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

var isUserNameTaken = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(username) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _userRepository["default"].findByUsername(username);

          case 2:
            _context4.t0 = _context4.sent;
            return _context4.abrupt("return", _context4.t0 !== null);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function isUserNameTaken(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

var isEmailUsed = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(email) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _userRepository["default"].findByEmail(email);

          case 2:
            _context5.t0 = _context5.sent;
            return _context5.abrupt("return", _context5.t0 !== null);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function isEmailUsed(_x6) {
    return _ref5.apply(this, arguments);
  };
}();

var login = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(user) {
    var userInDb, doesPasswordMatch;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _userRepository["default"].findByUsername(user.username);

          case 2:
            userInDb = _context6.sent;
            doesPasswordMatch = userInDb && _bcrypt["default"].compareSync(user['password'], userInDb['password']);
            return _context6.abrupt("return", doesPasswordMatch ? userInDb : null);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function login(_x7) {
    return _ref6.apply(this, arguments);
  };
}();

var forgottenPassword = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(userEmail) {
    var user, token, expiration;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _userRepository["default"].findByEmail(userEmail);

          case 2:
            user = _context7.sent;
            _context7.next = 5;
            return _passwordToken["default"].generatePasswordToken();

          case 5:
            token = _context7.sent;
            expiration = Math.round(Date.now() / 1000 + 86400);
            user['forgottenPasswordToken'] = token;
            user['forgottenPasswordTokenExpiration'] = expiration;
            _context7.next = 11;
            return user.save();

          case 11:
            _mailer["default"].sendPasswordResetMail(userEmail, token, user.username);

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function forgottenPassword(_x8) {
    return _ref7.apply(this, arguments);
  };
}();

var resetPassword = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(userEmail, password) {
    var user;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _userRepository["default"].findByEmail(userEmail);

          case 2:
            user = _context8.sent;
            user['password'] = _bcrypt["default"].hashSync(password, 5);
            user['forgottenPasswordToken'] = null;
            user['forgottenPasswordTokenExpiration'] = null;
            user['active'] = true;

            _mailer["default"].confirmPasswordChange(user['email'], user['username']);

            _context8.next = 10;
            return user.save();

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function resetPassword(_x9, _x10) {
    return _ref8.apply(this, arguments);
  };
}();

var findById = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(id) {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _userRepository["default"].findById(id);

          case 2:
            return _context9.abrupt("return", _context9.sent);

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function findById(_x11) {
    return _ref9.apply(this, arguments);
  };
}();

var findByEmail = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(email) {
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _userRepository["default"].findByEmail(email);

          case 2:
            return _context10.abrupt("return", _context10.sent);

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function findByEmail(_x12) {
    return _ref10.apply(this, arguments);
  };
}();

var findByPasswordToken = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(passwordToken) {
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _userRepository["default"].findByPasswordToken(passwordToken);

          case 2:
            return _context11.abrupt("return", _context11.sent);

          case 3:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function findByPasswordToken(_x13) {
    return _ref11.apply(this, arguments);
  };
}();

var findByConfirmationToken = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(confirmationToken) {
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return _userRepository["default"].findByConfirmationToken(confirmationToken);

          case 2:
            return _context12.abrupt("return", _context12.sent);

          case 3:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function findByConfirmationToken(_x14) {
    return _ref12.apply(this, arguments);
  };
}();

var getUsersAvatar = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(userId) {
    var user;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _userRepository["default"].findById(userId);

          case 2:
            user = _context13.sent;
            return _context13.abrupt("return", user['avatar']);

          case 4:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function getUsersAvatar(_x15) {
    return _ref13.apply(this, arguments);
  };
}();

var _default = {
  create: create,
  isEmailUsed: isEmailUsed,
  isUserNameTaken: isUserNameTaken,
  login: login,
  findById: findById,
  forgottenPassword: forgottenPassword,
  resetPassword: resetPassword,
  findByEmail: findByEmail,
  findByConfirmationToken: findByConfirmationToken,
  findByPasswordToken: findByPasswordToken,
  confirmAccount: confirmAccount,
  generateNewConfirmationToken: generateNewConfirmationToken,
  getUsersAvatar: getUsersAvatar
};
exports["default"] = _default;
//# sourceMappingURL=user-service.js.map