"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _duel = _interopRequireDefault(require("../models/duel"));

var _sequelize = require("sequelize");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var create = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var savedDuel;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _duel["default"].create();

          case 2:
            savedDuel = _context.sent;
            return _context.abrupt("return", savedDuel);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function create() {
    return _ref.apply(this, arguments);
  };
}();

var findById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _duel["default"].findOne({
              where: {
                id: id
              }
            });

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findById(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var findOneUnfinished = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _duel["default"].findOne({
              where: {
                playerOneId: _defineProperty({}, _sequelize.Op.ne, null),
                playerTwoId: null,
                finished: false
              }
            });

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function findOneUnfinished() {
    return _ref3.apply(this, arguments);
  };
}();

var findOneUnfinishedOnePlayerOnly = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(playerId) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _duel["default"].findOne({
              where: {
                playerOneId: playerId,
                playerTwoId: null,
                finished: false
              }
            });

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function findOneUnfinishedOnePlayerOnly(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

var findByIdUnfinished = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _duel["default"].findOne({
              where: {
                id: id,
                finished: false
              }
            });

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function findByIdUnfinished(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

var _default = {
  create: create,
  findById: findById,
  findOneUnfinished: findOneUnfinished,
  findOneUnfinishedOnePlayerOnly: findOneUnfinishedOnePlayerOnly,
  findByIdUnfinished: findByIdUnfinished
};
exports["default"] = _default;
//# sourceMappingURL=duel-repository.js.map