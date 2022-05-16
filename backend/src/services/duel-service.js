import DuelRepository from "../repositories/duel-repository";
import UserService from "./user-service";
import QuestionService from "./question-service";
import DuelQuestionsRepository from "../repositories/duel-questions-repository";
import AnswerPointsRules from "../rules/answer-points-rules";
import DuelRoundScoreService from "./duel-round-score-service";
import DuelQuestionsService from "./duel-questions-service";
import AnsweredQuestionRepository
  from "../repositories/answered-question-repository";
import AnsweredQuestionsService from "./answered-questions-service";

const storeDuel = async (playerId) => {
  let unfinishedDuel = await DuelRepository.findOneUnfinishedOnePlayerOnly(
      playerId);
  // * user double clicked on start duel
  if (unfinishedDuel) {
    return unfinishedDuel;
  }

  let possibleDuel = await DuelRepository.findOneUnfinished();
  let player = await UserService.findById(playerId);
  // * duel with waiting player one
  if (possibleDuel) {
    possibleDuel.setPlayerTwo(player);
    possibleDuel['playerTwoUsername'] = player['username'];
    await possibleDuel.save();
    return possibleDuel;
  }
  // * no waiting duel
  let duel = await DuelRepository.create();
  duel.setPlayerOne(player);
  duel['playerOneUsername'] = player['username'];
  await duel.save();
  return duel;
};

const isSecondPlayerIn = async (duelId) => {
  return await DuelRepository.findByIdUnfinished(duelId);
};

const setCategories = async (duelId, categories) => {
  let questions = await QuestionService.getQuestionsForDuel(categories);
  for (let q of questions) {
    await DuelQuestionsService.create(duelId, q.id);
  }
};

const getQuestion = async (duelId, playerId) => {
  let duel = await DuelRepository.findById(duelId);
  try {
    let questionNumber = playerId === duel['playerOneId']
        ? duel['questionsNumPlayerOne'] - 1 : duel['questionsNumPlayerTwo'] - 1;
    let questions = await duel.getQuestions();
    let question = questions[questionNumber];
    let answersFull = await question.getPossibleAnswers();
    let answers = [];
    answersFull.forEach(e => answers.push({id: e.id, answer: e.answer}))

    return {
      id: question.id,
      difficulty: question['difficulty'],
      question: question['question'],
      answers: shuffle(answers)
    }
  } catch (e) {
    return null;
  }
};

const checkAnswer = async (duelId, playerId, guessAnswerId, questionId) => {
  let duel = await DuelRepository.findById(duelId);
  let question = await QuestionService.findById(questionId);
  let player = await UserService.findById(playerId);

  let points = question['correct_answer_id'] === guessAnswerId
      ? AnswerPointsRules.points(question['difficulty']) : 0;

  duel['playerOneRoundScore'] += duel['playerOneId'] === playerId && points;
  duel['playerTwoRoundScore'] += duel['playerTwoId'] === playerId && points;

  player['totalScore'] += duel['playerOneId'] === playerId && points;
  player['totalScore'] += duel['playerTwoId'] === playerId && points;
  await player.save();

  duel['questionsNumPlayerOne'] += duel['playerOneId'] === playerId && 1;
  duel['questionsNumPlayerTwo'] += duel['playerTwoId'] === playerId && 1;
  await duel.save();

  await AnsweredQuestionsService.create(duelId, playerId, questionId);

  return {
    points,
    playerTotalScore: player['totalScore'],
    correctAnswerId: question['correct_answer_id'],
    guessAnswerId,
    questionNumber: duel['playerOneId'] === playerId
        ? duel['questionsNumPlayerOne'] : duel['questionsNumPlayerTwo']
  };
};

const getRoundResults = async (duelId) => {
  let duel = await DuelRepository.findById(duelId);

  if ((duel['questionsNumPlayerOne'] - 1) % 5 === 0 && (duel['questionsNumPlayerTwo'] - 1)
      % 5 === 0) {

    duel['playerOneWins'] += duel['playerOneRoundScore']
        > duel['playerTwoRoundScore'] && 1;
    duel['playerTwoWins'] += duel['playerOneRoundScore']
        < duel['playerTwoRoundScore'] && 1;

    await DuelRoundScoreService.create(duel['round'],
        duel['playerOneRoundScore'], duel['playerTwoRoundScore'], duel.id);

    duel['round'] = duel['round'] >= 5 ? 5 : duel['round'] + 1;
    duel['playerOneRoundScore'] = 0;
    duel['playerTwoRoundScore'] = 0;

    if (duel['questionsNumPlayerOne'] === 26 && duel['questionsNumPlayerTwo']
        === 26) {
      duel.finished = true;
    }

    await duel.save();

    let scores = await duel.getDuelRoundScores();

    return {
      duel,
      scores
    };
  } else {
    return null;
  }
};

const findByIdUnfinished = async (duelId) => {
  return await DuelRepository.findByIdUnfinished(duelId);
};

const isPlayerInDuel = (playerId, duel) => {
  if (duel['playerOneId'] === playerId) {
    return true;
  }
  if (duel['playerTwoId'] === playerId) {
    return true
  }
  return false;
};

const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
};


export default {
  storeDuel,
  isSecondPlayerIn,
  setCategories,
  findByIdUnfinished,
  getQuestion,
  checkAnswer,
  getRoundResults,
  isPlayerInDuel
};
