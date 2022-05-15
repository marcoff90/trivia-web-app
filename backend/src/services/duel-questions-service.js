import DuelQuestionsRepository from "../repositories/duel-questions-repository";

const isQuestionInDuel = async (questionId, duelId) => {
  return await DuelQuestionsRepository.findByDuelIdAndQuestionId(duelId,
      questionId) !== null;
};

const create = async (duelId, questionId) => {
  let duelQ = {
    duelId: duelId,
    questionId: questionId
  };
  await DuelQuestionsRepository.create(duelQ);
};

const findByDuelId = async (duelId) => {
  return await DuelQuestionsRepository.findByDuelId(duelId);
}

export default {
  isQuestionInDuel,
  create,
  findByDuelId
};
