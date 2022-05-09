import sequelize from "../config/database";
import DataTypes from "sequelize";

const PossibleAnswer = sequelize.define('possible_answer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {timestamps: false});

export default PossibleAnswer;
