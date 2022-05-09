import Question from "../models/question";
import "core-js/stable";
import "regenerator-runtime/runtime";
import {Sequelize} from "sequelize";

const findById = async (id) => {
  return await Question.findOne({
    where: {
      id: id
    }
  });
};

const findFiveRandomByCategoryId = async (categoryId) => {
  return await Question.findAll({
    where: {
      category_id: categoryId
    },
    order: Sequelize.literal('rand()'),
    limit: 5
  });
};

export default {
  findById,
  findFiveRandomByCategoryId
}
