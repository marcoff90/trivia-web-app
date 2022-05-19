import sequelize from "../config/database";
import DataTypes from "sequelize";

const Question = sequelize.define('question', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  correct_answer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  difficulty: {
    type: DataTypes.STRING,
    allowNull: true
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correct_answer_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {timestamps: false});

export default Question;
