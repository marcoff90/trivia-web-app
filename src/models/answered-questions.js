import sequelize from "../config/database";
import DataTypes from "sequelize";

const AnsweredQuestions = sequelize.define('answeredQuestions', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  duelId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  playerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  }
}, {timestamps: false});

export default AnsweredQuestions;
