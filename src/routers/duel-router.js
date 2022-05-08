import {Router} from 'express';
import DuelController from "../controllers/duel-controller";

const DuelRouter = Router();

DuelRouter.post('/api/duels', DuelController.storeDuel);

DuelRouter.get('/api/duels/:id/check', DuelController.isSecondPlayerIn);

DuelRouter.post('/api/duels/:id/categories', DuelController.setCategories);

DuelRouter.get('/api/duels/:id/questions', DuelController.getQuestion);

export default DuelRouter;
