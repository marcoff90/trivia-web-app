"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _database = _interopRequireDefault(require("../config/database"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Duel = _database["default"].define('duel', {
  id: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  playerOneRoundScore: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  playerTwoRoundScore: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  playerOneWins: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  playerTwoWins: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  playerOneUsername: {
    type: _sequelize["default"].STRING,
    allowNull: true,
    defaultValue: null
  },
  playerTwoUsername: {
    type: _sequelize["default"].STRING,
    allowNull: true,
    defaultValue: null
  },
  questionsNumPlayerOne: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  questionsNumPlayerTwo: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  finished: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  playerOneRound: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  playerTwoRound: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  createdAt: {
    type: _sequelize["default"].DOUBLE,
    allowNull: false,
    defaultValue: Math.round(Date.now() / 1000)
  },
  playerTwoConnectedAt: {
    type: _sequelize["default"].DOUBLE,
    allowNull: true,
    defaultValue: null
  }
}, {
  timestamps: false
});

var _default = Duel;
exports["default"] = _default;
//# sourceMappingURL=duel.js.map