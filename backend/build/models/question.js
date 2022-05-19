"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _database = _interopRequireDefault(require("../config/database"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Question = _database["default"].define('question', {
  id: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  correct_answer: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  difficulty: {
    type: _sequelize["default"].STRING,
    allowNull: true
  },
  question: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  // type: {
  //   type: DataTypes.STRING,
  //   allowNull: true
  // },
  correct_answer_id: {
    type: _sequelize["default"].INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

var _default = Question;
exports["default"] = _default;
//# sourceMappingURL=question.js.map