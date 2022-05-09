import DuelRoundScore from "../models/duel-round-score";

const create = async (duelRoundScore) => {
  await DuelRoundScore.create(duelRoundScore);
};

export default {
  create
};
