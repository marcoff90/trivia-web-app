import sequelize from "./database";
import Question from "../models/question";
import Category from "../models/category";
import PossibleAnswer from "../models/possible-answer";
import DuelQuestions from "../models/duel-questions";
import Duel from "../models/duel";
import User from "../models/user";
import DuelRoundScore from "../models/duel-round-score";

const createRelationships = () => {

  Category.hasMany(Question, {
    as: 'categoryQuestions',
    foreignKey: 'category_id'
  });

  Question.belongsTo(Category, {
    as: 'categoryQuestion',
    foreignKey: 'category_id'
  });

  Question.hasMany(PossibleAnswer, {
    as: 'possibleAnswers',
    foreignKey: 'question_id',
    getPossibleAnswers() {
      return this.getDataValue('possibleAnswers');
    }
  });

  PossibleAnswer.belongsTo(Question, {
    as: 'possibleAnswer',
    foreignKey: 'question_id',
  });

  Question.belongsToMany(Duel, {
    through: DuelQuestions
  });

  Duel.belongsToMany(Question, {
    through: DuelQuestions,
    getQuestions() {
      return this.getDataValue;
    }
  });

  Duel.belongsTo(User, {
    as: 'playerOne',
    foreignKey: 'playerOneId',
    setPlayerOne(playerOne) {
      this.setDataValue('playerOne', playerOne);
    }
  });

  Duel.belongsTo(User, {
    as: 'playerTwo',
    foreignKey: 'playerTwoId',
    setPlayerTwo(playerTwo) {
      this.setDataValue('playerTwo', playerTwo);
    }
  });

  Duel.hasMany(DuelRoundScore, {
    as: 'duelRoundScores',
    foreignKey: 'duel_id',
    getDuelRoundScores() {
      return this.getDataValue('duelRoundScores');
    }
  });

  DuelRoundScore.belongsTo(Duel, {
    as: 'duelRoundScore',
    foreignKey: 'duel_id'
  });

  sequelize.sync()
  .then(res => {
    console.log(res);
  })
};

export default createRelationships;
