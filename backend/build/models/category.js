"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _database = _interopRequireDefault(require("../config/database"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Category = _database["default"].define('category', {
  id: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  category: {
    type: _sequelize["default"].STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

var _default = Category;
exports["default"] = _default;
//# sourceMappingURL=category.js.map