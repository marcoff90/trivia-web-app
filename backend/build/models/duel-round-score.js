"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _database = _interopRequireDefault(require("../config/database"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DuelRoundScore = _database["default"].define('duelRoundScore', {
  id: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  round: {
    type: _sequelize["default"].INTEGER,
    allowNull: true,
    defaultValue: null
  },
  playerOneScore: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    defaultValue: -1
  },
  playerTwoScore: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    defaultValue: -1
  }
}, {
  timestamps: false
});

var _default = DuelRoundScore;
exports["default"] = _default;
//# sourceMappingURL=duel-round-score.js.map