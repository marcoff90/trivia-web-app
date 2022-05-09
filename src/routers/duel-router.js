import {Router} from 'express';
import DuelController from "../controllers/duel-controller";

const DuelRouter = Router();

DuelRouter.get('/api/duels', DuelController.storeDuel);

DuelRouter.get('/api/duels/:id/check', DuelController.isSecondPlayerIn);

DuelRouter.post('/api/duels/:id/categories', DuelController.setCategories);

DuelRouter.get('/api/duels/:id/questions', DuelController.getQuestion);

DuelRouter.get('/api/duels/:id/questions/:questionId',
    DuelController.checkAnswer);

DuelRouter.get('/api/duels/:id/results', DuelController.showRoundScore);

export default DuelRouter;
