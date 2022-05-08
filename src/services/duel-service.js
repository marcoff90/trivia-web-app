import DuelRepository from "../repositories/duel-repository";
import UserService from "./user-service";
import QuestionService from "./question-service";
import question from "../models/question";
import DuelQuestionsRepository from "../repositories/duel-questions-repository";

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
  let duel = await DuelRepository.findByIdUnfinished(duelId);
  let duelQs = await duel.getQuestions();
  return duelQs;
};

const getQuestion = async (duelId, playerId) => {

}

const findByIdUnfinished = async (duelId) => {
  return await DuelRepository.findByIdUnfinished(duelId);
};

export default {
  storeDuel,
  isSecondPlayerIn,
  setCategories,
  findByIdUnfinished
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
