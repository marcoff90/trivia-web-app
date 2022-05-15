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

const findByDuelId = async (duelId) => {
  return await DuelQuestions.findAll({
    where: {
      duelId: duelId
    }
  });
};


export default {
  create,
  findByDuelIdAndQuestionId,
  findByDuelId
};
