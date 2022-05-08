import sequelize from "./database";
import Question from "../models/question";
import Category from "../models/category";
import PossibleAnswer from "../models/possible-answer";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";

const createRelationships = () => {

  Category.hasMany(Question, {
    as: 'question',
    foreignKey: 'category_id',
    getQuestions() {
      return this.getDataValue('question');
    }
  })

  Question.belongsTo(Category, {
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

  sequelize.sync()
  .then(res => {
    console.log(res);
  })
};

export default createRelationships;
