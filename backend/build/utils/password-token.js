"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _userService = _interopRequireDefault(require("../services/user-service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var generatePasswordToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var token, characters, i, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = '';
            characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

            for (i = 0; i < 24; i++) {
              token += characters.charAt(Math.floor(Math.random() * characters.length));
            } // user needs a unique token


            _context.next = 5;
            return _userService["default"].findByPasswordToken(token);

          case 5:
            user = _context.sent;

            if (!user) {
              _context.next = 9;
              break;
            }

            _context.next = 9;
            return generatePasswordToken();

          case 9:
            return _context.abrupt("return", token);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function generatePasswordToken() {
    return _ref.apply(this, arguments);
  };
}();

var generateConfirmationToken = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var token, characters, i, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            token = '';
            characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

            for (i = 0; i < 24; i++) {
              token += characters.charAt(Math.floor(Math.random() * characters.length));
            } // user needs a unique token


            _context2.next = 5;
            return _userService["default"].findByConfirmationToken(token);

          case 5:
            user = _context2.sent;

            if (!user) {
              _context2.next = 9;
              break;
            }

            _context2.next = 9;
            return generateConfirmationToken();

          case 9:
            return _context2.abrupt("return", token);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function generateConfirmationToken() {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  generatePasswordToken: generatePasswordToken,
  generateConfirmationToken: generateConfirmationToken
};
exports["default"] = _default;
//# sourceMappingURL=password-token.js.map