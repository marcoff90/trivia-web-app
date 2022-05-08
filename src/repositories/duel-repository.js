import Duel from "../models/duel";

const create = async () => {
  let savedDuel = await Duel.create();
  return savedDuel;
};

const findById = async (id) => {
  return await Duel.findOne({
    where: {
      id: id
    }
  });
};

const findOneUnfinished = async () => {
  return await Duel.findOne({
    where: {
      playerTwoId: null,
      finished: false
    }
  });
};

const findOneUnfinishedOnePlayerOnly = async (playerId) => {
  return await Duel.findOne({
    where: {
      playerOneId: playerId,
      playerTwoId: null,
      finished: false
    }
  });
};

const findOneUnfinishedByPlayerOneId = async (playerId) => {
  return await Duel.findOne({
    where: {
      playerOneId: playerId,
      finished: false
    }
  });
};

export default {
  create,
  findById,
  findOneUnfinished,
  findOneUnfinishedOnePlayerOnly,
  findOneUnfinishedByPlayerOneId
};
