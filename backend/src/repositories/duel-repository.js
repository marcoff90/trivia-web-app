import Duel from "../models/duel";
import {Op} from "sequelize";

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
      playerOneId: {
        [Op.ne]: null
      },
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

const findByIdUnfinished = async (id) => {
  return await Duel.findOne({
    where: {
      id: id,
      finished: false,
    }
  });
};

const findAllUnfinished = async () => {
  return await Duel.findAll({
    where: {
      finished: false,
      playerTwoId: null
    }
  });
};

const findAllUnfinishedWithBothPlayers = async () => {
  return await Duel.findAll({
    where: {
      finished: false,
      playerTwoId: {
        [Op.ne]: null
      }
    }
  })
};


export default {
  create,
  findById,
  findOneUnfinished,
  findOneUnfinishedOnePlayerOnly,
  findByIdUnfinished,
  findAllUnfinished,
  findAllUnfinishedWithBothPlayers
};
