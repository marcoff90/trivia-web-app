import QuestionRepository from "../repositories/question-repository";

const getQuestionsForDuel = async (categories) => {
  let questions = [];
  for (let categoryId of categories) {
    let fiveQuestions = await QuestionRepository.findFiveRandomByCategoryId(
        categoryId);
    fiveQuestions.forEach(q => questions.push(q));
  }
  return questions;
};

export default {
  getQuestionsForDuel
};
