import AnsweredQuestionRepository
  from "../repositories/answered-question-repository";

const create = async (duelId, playerId, questionId) => {
  let answeredQuestion = {
    duelId,
    playerId,
    questionId
  }
  await AnsweredQuestionRepository.create(answeredQuestion);
};

const findByDuelIdPlayerIdAndQuestionId = async (duelId, playerId,
    questionId) => {
  return await AnsweredQuestionRepository.findByDuelIdPlayerIdAndQuestionId(
      duelId, playerId, questionId);
};

export default {
  create,
  findByDuelIdPlayerIdAndQuestionId
};
