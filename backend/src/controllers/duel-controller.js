import DuelService from "../services/duel-service";
import ApiError from "../error/api-error";
import DuelQuestionsService from "../services/duel-questions-service";
import AnsweredQuestionsService from "../services/answered-questions-service";

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
  let duel = await DuelService.findByIdUnfinished(duelId);

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
  let duel = await DuelService.findByIdUnfinished(duelId);
  let questionsCount = req.query['count']

  if (!duel) {
    next(ApiError.notFound('Duel not found!'));

  } else if (!duel['playerOneId'] && !duel['playerTwoId']) {
    next(ApiError.badRequest('Two players must play the game!'));

  } else if (!DuelService.isPlayerInDuel(player.id, duel)) {
    next(ApiError.forbidden('Player not part of this duel!'))

  } else if (!questionsCount) {
    next(ApiError.badRequest('Questions count must be provided!'));

  } else if (questionsCount > 1) {
    next(ApiError.badRequest('Questions count must be equal to 1!'));

  } else {
    let question = await DuelService.getQuestion(duelId, player.id);

    if (!question) {
      next(ApiError.notFound("Questions haven't been assigned yet"))
    } else {
      res.json(question);
    }
  }
};

const checkAnswer = async (req, res, next) => {
  let duelId = req.params.id;
  let questionId = req.params.questionId;
  let guessAnswerId = req.query['guess'];
  let player = req.user;
  let answeredQuestion = await AnsweredQuestionsService.findByDuelIdPlayerIdAndQuestionId(
      duelId, player.id, questionId);

  try {
    guessAnswerId = parseInt(guessAnswerId);
  } catch (e) {
    next(ApiError.badRequest('Guess must be a number!'))
  }

  let isQuestionInDuel = await DuelQuestionsService.isQuestionInDuel(questionId,
      duelId);

  let duel = await DuelService.findByIdUnfinished(duelId);

  if (!duel) {
    next(ApiError.notFound('Duel not found!'));

  } else if (!isQuestionInDuel) {
    next(ApiError.badRequest('Question not part of duel!'))

  } else if (!DuelService.isPlayerInDuel(player.id, duel)) {
    next(ApiError.forbidden('Player not part of this duel!'))

  } else if (!guessAnswerId) {
    next(ApiError.badRequest('Guess must be provided!'));

  } else if (answeredQuestion) {
    next(ApiError.badRequest("You've already answered this question!"));

  } else {
    let result = await DuelService.checkAnswer(duelId, player.id, guessAnswerId,
        questionId);
    res.json(result);
  }
};

const showRoundScore = async (req, res, next) => {
  let duelId = req.params.id;
  let duel = await DuelService.findByIdUnfinished(duelId);
  if (!duel) {
    next(ApiError.notFound('Duel not found!'));
  } else {
    let results = await DuelService.getRoundResults(duelId);
    if (results) {
      res.json(results);
    } else {
      res.json('Round is not finished for both players');
    }
  }
};

export default {
  storeDuel,
  isSecondPlayerIn,
  setCategories,
  getQuestion,
  checkAnswer,
  showRoundScore
};
