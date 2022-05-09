import sequelize from "../config/database";
import DataTypes from "sequelize";

const DuelRoundScore = sequelize.define('duelRoundScore', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  round: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  playerOneScore: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  playerTwoScore: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  }
}, {timestamps: false})

export default DuelRoundScore;
