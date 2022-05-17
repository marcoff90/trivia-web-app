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
import {compileTrust} from "express/lib/utils";

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
  for (let i = 1; i <= 5; i++) {
    await DuelRoundScoreService.create(i, duel.id);
  }
  duel.setPlayerOne(player);
  duel['playerOneUsername'] = player['username'];
  await duel.save();
  return duel;
};

const isSecondPlayerIn = async (duelId) => {
  return await DuelRepository.findByIdUnfinished(duelId);
};

const setCategories = async (duelId, categories) => {
  // in case of double assigning nothing happens
  let possibleQuestions = await DuelQuestionsService.findByDuelId(duelId);
  if (possibleQuestions.length === 0) {
    let questions = await QuestionService.getQuestionsForDuel(categories);
    for (let q of questions) {
      await DuelQuestionsService.create(duelId, q.id);
    }
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

  // if question num % 5 = 0 setResults for player
  if ((duel['questionsNumPlayerOne'] - 1) % 5 === 0 && playerId === duel['playerOneId']) {
    console.log('setting res')
    await setPlayerOneResults(duelId, playerId);
  }
  if ((duel['questionsNumPlayerTwo'] - 1) % 5 === 0 && playerId === duel['playerTwoId']) {
    console.log('setting res player two')
    await setPlayerTwoResults(duelId, playerId);
  }

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

const setPlayerOneResults = async (duelId, playerId) => {
  let duel = await DuelRepository.findById(duelId);
  let roundNumber = playerId == duel['playerOneId'] ? duel['playerOneRound'] : duel['playerTwoRound'];

  let duelScore = await DuelRoundScoreService.findOneByDuelIdAndRound(duelId,
      roundNumber);

  if (duelScore.playerOneScore < 0) {
    duelScore.playerOneScore = duel['playerOneRoundScore'];
    duel['playerOneRoundScore'] = 0;
  }
  await duelScore.save();
  await duel.save();
};

const setPlayerTwoResults = async (duelId, playerId) => {
  let duel = await DuelRepository.findById(duelId);
  console.log(playerId + ' is player two')
  let roundNumber = playerId == duel['playerOneId'] ? duel['playerOneRound'] : duel['playerTwoRound'];

  let duelScore = await DuelRoundScoreService.findOneByDuelIdAndRound(duelId,
      roundNumber);

  if (duelScore.playerTwoScore <= 0) {
    duelScore.playerTwoScore = duel['playerTwoRoundScore'];
    duel['playerTwoRoundScore'] = 0;
  }

  await duelScore.save();
  await duel.save();
};

const getRoundResults = async (duelId, playerId) => {
  let duel = await DuelRepository.findById(duelId);
  let roundNumber = playerId === duel['playerOneId'] ? duel['playerOneRound'] : duel['playerTwoRound'];

  let results = await DuelRoundScoreService.findByDuelIdAndRoundNumberWhereBothPlayers(
      duelId, roundNumber);

  if (!results) {
    return null;
  } else {

    duel['playerOneWins'] += results['playerOneScore']
        > results['playerScore'] && 1;
    duel['playerTwoWins'] += results['playerOneScore']
        < results['playerTwoScore'] && 1;
    if (duel['questionsNumPlayerOne'] === 26 && duel['questionsNumPlayerTwo']
        === 26) {
      duel.finished = true;
    }
    if (playerId === duel['playerOneId']) {
      duel['playerOneRound'] = duel['playerOneRound'] + 1;
    } else if (playerId === duel['playerTwoId']) {
      duel['playerTwoRound'] = duel['playerTwoRound'] + 1;
    }


    await duel.save();

    let scores = await duel.getDuelRoundScores(duelId);

    return {
      duel,
      scores
    };
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
