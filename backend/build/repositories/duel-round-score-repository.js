"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _duelRoundScore = _interopRequireDefault(require("../models/duel-round-score"));

var _sequelize = require("sequelize");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var create = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(duelRoundScore) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _duelRoundScore["default"].create(duelRoundScore);

          case 2:
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

var findByDuelIdAndRoundNumber = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(duelId, roundNumber) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _duelRoundScore["default"].findOne({
              where: {
                duel_id: duelId,
                round: roundNumber
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

  return function findByDuelIdAndRoundNumber(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var findByDuelIdAndRoundNumberWhereBothPlayers = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(duelId, roundNumber) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _duelRoundScore["default"].findOne({
              where: {
                duel_id: duelId,
                round: roundNumber,
                playerOneScore: _defineProperty({}, _sequelize.Op.ne, -1),
                playerTwoScore: _defineProperty({}, _sequelize.Op.ne, -1)
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

  return function findByDuelIdAndRoundNumberWhereBothPlayers(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = {
  create: create,
  findByDuelIdAndRoundNumber: findByDuelIdAndRoundNumber,
  findByDuelIdAndRoundNumberWhereBothPlayers: findByDuelIdAndRoundNumberWhereBothPlayers
};
exports["default"] = _default;
//# sourceMappingURL=duel-round-score-repository.js.map