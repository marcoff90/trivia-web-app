import DuelRepository from "../repositories/duel-repository";
import UserService from "./user-service";

const storeDuel = async (playerId) => {
  let possibleDuel = await DuelRepository.findOneUnfinished();
  let player = await UserService.findById(playerId);

  if (possibleDuel) {
    possibleDuel.setPlayerTwo(player);
    await possibleDuel.save();
    return possibleDuel;
  }

  let duel = await DuelRepository.create();
  duel.setPlayerOne(player);
  await duel.save();
  return duel;
};

export default {
  storeDuel
}

/**
 * store duel
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
