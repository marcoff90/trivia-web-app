import {Router} from 'express';
import DuelController from "../controllers/duel-controller";

const DuelRouter = Router();

DuelRouter.post('/api/duel', DuelController.storeDuel);

DuelRouter.get('/api/duel/check', DuelController.isSecondPlayerIn);

export default DuelRouter;
