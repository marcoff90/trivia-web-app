import DuelRoundScoreRepository
  from "../repositories/duel-round-score-repository";

const create = async (duelRound, duelId) => {
  let duelRoundScore = {
    round: duelRound,
    duel_id: duelId,
    playerOneScore: -1,
    playerTwoScore: -1
  };
  await DuelRoundScoreRepository.create(duelRoundScore);
};

const findOneByDuelIdAndRound = async (duelId, roundNumber) => {
  return await DuelRoundScoreRepository.findByDuelIdAndRoundNumber(duelId,
      roundNumber);
};

const findByDuelIdAndRoundNumberWhereBothPlayers = async (duelId,
    roundNumber) => {
  return await DuelRoundScoreRepository.findByDuelIdAndRoundNumberWhereBothPlayers(
      duelId, roundNumber);
};

export default {
  create,
  findOneByDuelIdAndRound,
  findByDuelIdAndRoundNumberWhereBothPlayers
};
