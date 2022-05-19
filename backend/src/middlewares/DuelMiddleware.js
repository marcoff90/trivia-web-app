import DuelRepository from "../repositories/duel-repository";
import DuelQuestionsService from "../services/duel-questions-service";

const DuelMiddleware = async (req, res, next) => {
  let duels = await DuelRepository.findAllUnfinished();
  let duelsWithBothPlayers = await DuelRepository.findAllUnfinishedWithBothPlayers();

  if (duels) {
    let timeNow = Math.round(Date.now() / 1000);

    for (let i = 0; i < duels.length; i++) {
      if (timeNow > duels[i].createdAt + 180) {
        duels[i].finished = true;
        await duels[i].save();
      }
    }
  }

  if (duelsWithBothPlayers) {
    let timeNow = Math.round(Date.now() / 1000);

    for (let i = 0; i < duelsWithBothPlayers.length; i++) {
      if (timeNow > duelsWithBothPlayers[i].playerTwoConnectedAt + 180) {
        let duelQuestions = await DuelQuestionsService.findByDuelId(
            duelsWithBothPlayers[i].id);
        if (duelQuestions.length === 0) {
          duelsWithBothPlayers[i].finished = true;
          await duelsWithBothPlayers[i].save();
        }


      }
    }
  }
  next();
};

export default DuelMiddleware;
