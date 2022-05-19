"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _database = _interopRequireDefault(require("../config/database"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = _database["default"].define('user', {
  id: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  username: {
    type: _sequelize["default"].STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: _sequelize["default"].STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  active: {
    type: _sequelize["default"].BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  avatar: {
    type: _sequelize["default"].STRING,
    allowNull: true,
    defaultValue: null
  },
  level: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  pointsToLevelUp: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  totalScore: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  deletedAt: {
    type: _sequelize["default"].TIME,
    allowNull: true,
    defaultValue: null
  },
  confirmationToken: {
    type: _sequelize["default"].STRING,
    allowNull: true,
    defaultValue: null,
    unique: true
  },
  confirmationTokenExpiration: {
    type: _sequelize["default"].STRING,
    allowNull: true,
    defaultValue: null,
    unique: true
  },
  forgottenPasswordToken: {
    type: _sequelize["default"].STRING,
    allowNull: true,
    defaultValue: null,
    unique: true
  },
  forgottenPasswordTokenExpiration: {
    type: _sequelize["default"].DOUBLE,
    allowNull: true,
    defaultValue: null
  }
}, {
  timestamps: false
});

var _default = User;
exports["default"] = _default;
//# sourceMappingURL=user.js.map