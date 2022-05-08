import sequelize from "../config/database";
import DataTypes from "sequelize";

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  pointsToLevelUp: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  totalScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  deletedAt: {
    type: DataTypes.TIME,
    allowNull: true,
    defaultValue: null
  }
}, {timestamps: false});

export default User;
