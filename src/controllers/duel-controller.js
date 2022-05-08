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

  } else if (isDuelReady['playerOneId'] !== player.id) {
    next(ApiError.unauthorized('Only players in duel can see the game'));

  } else {
    res.json(isDuelReady);
  }
};

const setCategories = async (req, res, next) => {
  let duelId = req.params.id;
  let player = req.user;
  let categories = req.body['categories'];
  let duel = await DuelService.findById(duelId);

  if (!categories) {
    next(ApiError.badRequest('Categories must be provided!'));
  }

  let categoriesSet = new Set(categories);

  if (categoriesSet.size !== 5) {
    next(ApiError.badRequest('Categories must be unique!'));

  } else if (categories.length !== 5) {
    next(ApiError.badRequest('Five categories must be chosen!'));

  } else if (!duel) {
    next(ApiError.notFound('Duel not found!'));

  } else if (duel['playerOneId'] !== player.id) {
    next(ApiError.badRequest('Only host player can set categories!'));

  } else {
    await DuelService.setCategories(duelId, categories);
    res.json('Categories added successfully');
  }
};

const getQuestion = async (req, res, next) => {
  let duelId = req.params.id;
  let player = req.user;
  let duel = await DuelService.findById(duelId);
  let questionsCount = req.query['count']

  if (!duel) {
    next(ApiError.notFound('Duel not found!'));

  } else if (!duel['playerOneId'] && !duel['playerTwoId']) {
    next(ApiError.badRequest('Two players must play the game!'));

  } else if (!questionsCount) {
    next(ApiError.badRequest('Questions count must be provided!'));

  } else if (questionsCount > 1) {
    next(ApiError.badRequest('Questions count must be equal to 1!'));

  } else {
    let question = await DuelService.getQuestion(duelId, player.id);
    res.json(question);
  }
};

export default {
  storeDuel,
  isSecondPlayerIn,
  setCategories,
  getQuestion
};
