"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _database = _interopRequireDefault(require("../config/database"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AnsweredQuestions = _database["default"].define('answeredQuestions', {
  id: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  duelId: {
    type: _sequelize["default"].INTEGER,
    allowNull: true,
    defaultValue: null
  },
  playerId: {
    type: _sequelize["default"].INTEGER,
    allowNull: true,
    defaultValue: null
  },
  questionId: {
    type: _sequelize["default"].INTEGER,
    allowNull: true,
    defaultValue: null
  }
}, {
  timestamps: false
});

var _default = AnsweredQuestions;
exports["default"] = _default;
//# sourceMappingURL=answered-questions.js.map