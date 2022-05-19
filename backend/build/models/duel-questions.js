"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _database = _interopRequireDefault(require("../config/database"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _duel = _interopRequireDefault(require("./duel"));

var _question = _interopRequireDefault(require("./question"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DuelQuestions = _database["default"].define('duel_questions', {
  id: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  duelId: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: _duel["default"],
      key: 'id'
    }
  },
  questionId: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: _question["default"],
      key: 'id'
    }
  }
}, {
  timestamps: false
});

var _default = DuelQuestions;
exports["default"] = _default;
//# sourceMappingURL=duel-questions.js.map