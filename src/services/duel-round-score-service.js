import DuelRoundScoreRepository
  from "../repositories/duel-round-score-repository";

const create = async (round, playerOneScore, playerTwoScore, duelId) => {
  let duelRoundScore = {
    round,
    playerOneScore,
    playerTwoScore,
    duel_id: duelId
  };
  await DuelRoundScoreRepository.create(duelRoundScore);
};

export default {
  create
};
