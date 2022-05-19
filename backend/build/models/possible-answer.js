"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _database = _interopRequireDefault(require("../config/database"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PossibleAnswer = _database["default"].define('possible_answer', {
  id: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  answer: {
    type: _sequelize["default"].STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

var _default = PossibleAnswer;
exports["default"] = _default;
//# sourceMappingURL=possible-answer.js.map