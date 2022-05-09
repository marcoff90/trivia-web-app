import DuelRepository from "../repositories/duel-repository";
import UserService from "./user-service";
import QuestionService from "./question-service";
import DuelQuestionsRepository from "../repositories/duel-questions-repository";
import AnswerPointsRules from "../rules/answer-points-rules";

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
    let duelQ = {
      duelId: duelId,
      questionId: q.id
    };
    await DuelQuestionsRepository.create(duelQ);
  }
};

const getQuestion = async (duelId, playerId) => {
  let duel = await DuelRepository.findById(duelId);
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
    question : question['question'],
    answers: answers
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

  return {
    points,
    playerTotalScore: player['totalScore'],
    correctAnswerId: question['correct_answer_id'],
    guessAnswerId,
    questionNumber: duel['playerOneId'] === playerId ? duel['questionsNumPlayerOne'] : duel['questionsNumPlayerTwo']
  };
};

const getRoundResults = async (duelId, playerId) => {
  let duel = await DuelRepository.findById(duelId);
  let player = await UserService.findById(playerId);

  if (duel['questionNumPlayerOne'] % 5 === 0 && duel['questionsNumPlayerTwo']
      % 5 === 0) {
    duel['playerOneWins'] += duel['playerOneRoundScore'] > duel['playerTwoRoundScore'] && 1;
    duel['playerTwoWins'] += duel['playerOneRoundScore'] < duel['playerTwoRoundScore'] && 1;
    duel['playerOneDuelScore'] += duel['playerOneRoundScore'];
    duel['playerTwoDuelScore'] += duel['playerTwoRoundScore'];
    // player['totalScore'] +=
  }
}

const findById = async (duelId) => {
  return await DuelRepository.findById(duelId);
};

export default {
  storeDuel,
  isSecondPlayerIn,
  setCategories,
  findById,
  getQuestion,
  checkAnswer
};

/**
 * store duel
 *  -> check if player didnt double click
 *  -> check if there's a duel without player two
 *    -> in repo make filter
 *    -> if so, assign player as player two
 *    -> cancel button on FE -> quits the duel
 *
 *  -> if no game
 *    -> create a new game and waits for a second player
 *
 *
 * is second player connected
 *  -> returns false if not
 *  -> returns player username when connected
 *  -> FE send request in interval to get the info
 *
 * getQuestion
 *  -> checks which player send the request
 *  -> returns DuelQuestions.getQuestions()[PlayerXXXQuestionNumber]
 *  -> only accessible when both players are in game
 *
 *  check answer
 *    -> check which player of duel sent request
 *    -> updates points
 *    -> increments number of questions for players
 *
 *
 * show round end
 *  -> returns score after round
 *  -> playerOneWin / PlayerTwoWin
 *
 *  finish duel
 *    -> after fifth round
 *    -> announces winner and final score
 *    -> updates total points of players
 *    -> sets finished status
 *
 *
 */
