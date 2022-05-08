import DuelQuestions from "../models/duel-questions";

const create = async (duelQuestion) => {
  await DuelQuestions.create(duelQuestion);
};

export default {
  create
};
