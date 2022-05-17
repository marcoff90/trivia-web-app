import DuelRoundScore from "../models/duel-round-score";
import {Op} from "sequelize";

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

const findByDuelIdAndRoundNumberWhereBothPlayers = async (duelId,
    roundNumber) => {
  return await DuelRoundScore.findOne({
    where: {
      duel_id: duelId,
      round: roundNumber,
      playerOneScore: {
        [Op.ne]: -1
      },
      playerTwoScore: {
        [Op.ne]: -1
      }
    }
  });
};

export default {
  create,
  findByDuelIdAndRoundNumber,
  findByDuelIdAndRoundNumberWhereBothPlayers
};
