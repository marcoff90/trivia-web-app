import Question from "../models/question";
import "core-js/stable";
import "regenerator-runtime/runtime";

const findById = async (id) => {
  return await Question.findOne({
    where: {
      id: id
    }
  });
};

export default {
  findById
}
