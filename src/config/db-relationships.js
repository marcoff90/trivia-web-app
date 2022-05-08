import sequelize from "./database";
import Question from "../models/question";
import Category from "../models/category";
import PossibleAnswer from "../models/possible-answer";
import DuelQuestions from "../models/duel-questions";
import Duel from "../models/duel";
import User from "../models/user";

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
      return this.getDataValue('possibleAnswer');
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

  User.hasOne(Duel, {
    as: 'playerOne',
    foreignKey: 'playerOneId',
    setPlayerOne(playerOne) {
      this.setDataValue('playerOne', playerOne);
    }
  });

  User.hasOne(Duel, {
    as: 'playerTwo',
    foreignKey: 'playerTwoId',
    setPlayerOne(playerTwo) {
      this.setDataValue('playerTwo', playerTwo);
    }
  });

  sequelize.sync()
  .then(res => {
    console.log(res);
  })
};

export default createRelationships;
