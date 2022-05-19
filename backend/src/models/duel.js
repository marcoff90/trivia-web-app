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
  playerOneRoundScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  playerTwoRoundScore: {
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
  playerOneUsername: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  playerTwoUsername: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  questionsNumPlayerOne: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  questionsNumPlayerTwo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  finished: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  playerOneRound: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  playerTwoRound: {
    type:DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  createdAt: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    defaultValue: false
  },
  playerTwoConnectedAt: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    defaultValue: null
  }
}, {timestamps: false});

export default Duel;
