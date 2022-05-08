import sequelize from "../config/database";
import DataTypes from "sequelize";

const Duel = sequelize.define('duel', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  playerOneScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  playerTwoScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  playerOneWins: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  playerTwoWins: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  questionsNumPlayerOne: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  questionsNumPlayerTwo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  finished: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {timestamps: false});

export default Duel;
