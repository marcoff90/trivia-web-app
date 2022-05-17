import DuelRoundScore from "../models/duel-round-score";

const create = async (duelRoundScore) => {
  await DuelRoundScore.create(duelRoundScore);
};

const findByDuelIdAndRoundNumber = async (duelId, roundNumber) => {
  return await DuelRoundScore.findOne({
    where: {
      duel_id: duelId,
      round: roundNumber
    }
  });
};


export default {
  create,
  findByDuelIdAndRoundNumber
};
