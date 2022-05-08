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
}

export default {
  create,
  findById,
  findOneUnfinished
}
