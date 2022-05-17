import DuelService from "../services/duel-service";
import ApiError from "../error/api-error";
import DuelQuestionsService from "../services/duel-questions-service";
import AnsweredQuestionsService from "../services/answered-questions-service";
import UserService from "../services/user-service";

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

  } else if (isDuelReady['playerTwoId'] == null) {
    next(ApiError.badRequest('Waiting for second player'));

  } else {
    res.json(isDuelReady);
  }
};

const areQuestionsChosen = async (req, res, next) => {
  let duelId = req.params.id;
  let player = req.user;
  let duel = await DuelService.findByIdUnfinished(duelId);
  let duelQuestions = await DuelQuestionsService.findByDuelId(duelId);

  if (!duel) {
    next(ApiError.notFound('Duel not found!'));

  } else if (duel['playerTwoId'] !== player.id) {
    next(ApiError.unauthorized('Only players in duel can see the game'));

  } else if (duelQuestions.length === 0) {
    next(ApiError.notFound('Questions have not been assigned yet'));

  } else {
    let playerOneAvatar = await UserService.getUsersAvatar(duel['playerOneId']);
    let playerTwoAvatar = await UserService.getUsersAvatar(duel['playerTwoId']);
    res.json({
      duel,
      playerOneAvatar,
      playerTwoAvatar
    });
  }
};

const setCategories = async (req, res, next) => {
  let duelId = req.params.id;
  let player = req.user;
  let categories = req.body['categories'];
  let duel = await DuelService.findByIdUnfinished(duelId);

  if (!categories) {
    next(ApiError.badRequest('Categories must be provided!'));

  } else if (categories.length !== 5) {
    next(ApiError.badRequest('Five categories must be chosen!'));
  }

  let categoriesSet = new Set(categories);

  if (categoriesSet.size !== 5) {
    next(ApiError.badRequest('Categories must be unique!'));

  } else if (!duel) {
    next(ApiError.notFound('Duel not found!'));

  } else if (duel['playerOneId'] !== player.id) {
    next(ApiError.badRequest('Only host player can set categories!'));

  } else {
    await DuelService.setCategories(duelId, categories);
    let playerOneAvatar = await UserService.getUsersAvatar(duel['playerOneId']);
    let playerTwoAvatar = await UserService.getUsersAvatar(duel['playerTwoId']);
    res.json({
      duel,
      playerOneAvatar,
      playerTwoAvatar
    });
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
  let player = req.user;
  let duel = await DuelService.findByIdUnfinished(duelId);
  if (!duel) {
    next(ApiError.notFound('Duel not found!'));
  } else {
    let duelWithResults = await DuelService.getRoundResults(duelId, player.id);

    console.log(duelWithResults);
    if (!duelWithResults) {
      next(ApiError.badRequest('Wait a moment for other player to finish this round too ☺️'));

    } else {
      let playerOneAvatar = await UserService.getUsersAvatar(
          duel['playerOneId']);
      let playerTwoAvatar = await UserService.getUsersAvatar(
          duel['playerTwoId']);
      res.json({
        duelWithResults,
        playerOneAvatar,
        playerTwoAvatar
      });
    }
  }
};

export default {
  storeDuel,
  isSecondPlayerIn,
  setCategories,
  getQuestion,
  checkAnswer,
  showRoundScore,
  areQuestionsChosen
};
