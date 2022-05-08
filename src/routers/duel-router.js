import {Router} from 'express';
import DuelController from "../controllers/duel-controller";

const DuelRouter = Router();

DuelRouter.post('/api/duel', DuelController.storeDuel);

export default DuelRouter;
