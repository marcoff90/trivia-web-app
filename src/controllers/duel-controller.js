import DuelService from "../services/duel-service";

const storeDuel = async (req, res, next) => {
  let user = req.user;
  let duel = await DuelService.storeDuel(user.id);

  if (duel) {
    res.json(duel);
  }
  next();
};

const isSecondPlayerIn = async (req, res, next) => {
  let user = req.user;
  let isDuelReady = await DuelService.isSecondPlayerIn(user.id);

  if (isDuelReady !== null) {
    res.json(isDuelReady);
  }
  next();
};

export default {
  storeDuel,
  isSecondPlayerIn
};
