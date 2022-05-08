import DuelService from "../services/duel-service";

const storeDuel = async (req, res, next) => {
  let user = req.user;
  let duel = await DuelService.storeDuel(user.id);
  res.json(duel);
};

export default {
  storeDuel
};
