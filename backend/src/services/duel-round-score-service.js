import DuelRoundScoreRepository
  from "../repositories/duel-round-score-repository";

const create = async (duelRound, playerOneScore, playerTwoScore, duelId) => {
  let duelRoundScore = {
    round: duelRound,
    playerOneScore,
    playerTwoScore,
    duel_id: duelId
  };
  await DuelRoundScoreRepository.create(duelRoundScore);
};

const findOneByDuelIdAndRound = async (duelId, roundNumber) => {
  return await DuelRoundScoreRepository.findByDuelIdAndRoundNumber(duelId,
      roundNumber);
};

export default {
  create,
  findOneByDuelIdAndRound
};
