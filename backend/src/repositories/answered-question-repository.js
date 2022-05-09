import AnsweredQuestions from "../models/answered-questions";

const create = async (answeredQuestion) => {
  await AnsweredQuestions.create(answeredQuestion);
};

const findByDuelIdPlayerIdAndQuestionId = async (duelId, playerId,
    questionId) => {
  return await AnsweredQuestions.findOne({
    where: {
      duelId: duelId,
      questionId: questionId,
      playerId: playerId
    }
  });
};

export default {
  create,
  findByDuelIdPlayerIdAndQuestionId
};
