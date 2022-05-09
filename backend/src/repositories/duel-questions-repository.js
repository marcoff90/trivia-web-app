import DuelQuestions from "../models/duel-questions";

const create = async (duelQuestion) => {
  await DuelQuestions.create(duelQuestion);
};

const findByDuelIdAndQuestionId = async (duelId, questionId) => {
  return await DuelQuestions.findOne({
    where: {
      duelId: duelId,
      questionId: questionId
    }
  });
};


export default {
  create,
  findByDuelIdAndQuestionId
};
