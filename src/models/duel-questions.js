import sequelize from "../config/database";
import DataTypes from "sequelize";
import Duel from "./duel";
import Question from "./question";

const DuelQuestions = sequelize.define('duel_questions', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  duelId: {
    type: DataTypes.INTEGER,
    references: {
      model: Duel,
      key: 'id'
    }
  },
  questionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Question,
      key: 'id'
    }
  }
}, {timestamps: false});

export default DuelQuestions;
