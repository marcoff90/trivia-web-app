import DuelService from "../services/duel-service";
import ApiError from "../error/api-error";

const storeDuel = async (req, res, next) => {
  let user = req.user;

  let duel = await DuelService.storeDuel(user.id);

  if (duel) {
    res.json(duel);
  }
  next();
};

const isSecondPlayerIn = async (req, res, next) => {
  let duelId = req.params.id;
  let player = req.user;
  let isDuelReady = await DuelService.isSecondPlayerIn(duelId);

  if (!isDuelReady) {
    next(ApiError.notFound('Duel not found!'))
  }

  if (isDuelReady['playerOneId'] !== player.id) {
    next(ApiError.unauthorized('Only players in duel can see the game'));
  }

  res.json(isDuelReady);
};

const setCategories = async (req, res, next) => {
  let duelId = req.params.id;
  let player = req.user;
  let categories = req.body['categories'];
  let duel = await DuelService.findByIdUnfinished(duelId);

  if (!categories) {
    next(ApiError.badRequest('Categories must be provided!'));
  }

  if (!duel) {
    next(ApiError.notFound('Duel not found!'));
  }

  if (duel['playerOneId'] !== player.id) {
    next(ApiError.badRequest('Only host player can set categories!'));
  }

  await DuelService.setCategories(duelId, categories);
  res.json('Categories added successfully');
};

export default {
  storeDuel,
  isSecondPlayerIn,
  setCategories
};
