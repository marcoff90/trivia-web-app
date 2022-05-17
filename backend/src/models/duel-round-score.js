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
    allowNull: false,
    defaultValue: -1
  },
  playerTwoScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: -1
  }
}, {timestamps: false})

export default DuelRoundScore;
