import express from 'express';
import cors from "cors";
import 'dotenv/config';
import apiErrorHandler from "./middlewares/api-error-handler";
import RegisterRouter from "./routers/register-router";
import AuthorizationMiddleware
  from "./middlewares/authorization-middleware";
import createRelationships from "./config/db-relationships";
import DuelRouter from "./routers/duel-router";
import CategoryRouter from "./routers/category-router";
import DuelMiddleware from "./middlewares/DuelMiddleware";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
createRelationships();
app.use(RegisterRouter);
app.use(AuthorizationMiddleware);
app.use(DuelMiddleware)
app.use(CategoryRouter);
app.use(DuelRouter);
app.use(apiErrorHandler);
app.listen(process.env.PORT || 3000);
