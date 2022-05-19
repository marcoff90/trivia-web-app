"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _duelRepository = _interopRequireDefault(require("../repositories/duel-repository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var DuelMiddleware = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var duels, duelsWithBothPlayers, timeNow, i, _i;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _duelRepository["default"].findAllUnfinished();

          case 2:
            duels = _context.sent;
            _context.next = 5;
            return _duelRepository["default"].findAllUnfinishedWithBothPlayers();

          case 5:
            duelsWithBothPlayers = _context.sent;
            console.log(duelsWithBothPlayers);
            timeNow = Math.round(Date.now() / 1000);

            if (!duels) {
              _context.next = 18;
              break;
            }

            i = 0;

          case 10:
            if (!(i < duels.length)) {
              _context.next = 18;
              break;
            }

            if (!(timeNow > duels[i].createdAt + 180)) {
              _context.next = 15;
              break;
            }

            duels[i].finished = true;
            _context.next = 15;
            return duels[i].save();

          case 15:
            i++;
            _context.next = 10;
            break;

          case 18:
            if (!duelsWithBothPlayers) {
              _context.next = 28;
              break;
            }

            _i = 0;

          case 20:
            if (!(_i < duelsWithBothPlayers.length)) {
              _context.next = 28;
              break;
            }

            if (!(timeNow > duelsWithBothPlayers[_i].playerTwoConnectedAt + 180)) {
              _context.next = 25;
              break;
            }

            duelsWithBothPlayers[_i].finished = true;
            _context.next = 25;
            return duelsWithBothPlayers[_i].save();

          case 25:
            _i++;
            _context.next = 20;
            break;

          case 28:
            next();

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function DuelMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = DuelMiddleware;
exports["default"] = _default;
//# sourceMappingURL=DuelMiddleware.js.map