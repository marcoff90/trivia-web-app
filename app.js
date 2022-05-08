import express from 'express';
import cors from "cors";
import 'dotenv/config';
import apiErrorHandler from "./src/middlewares/api-error-handler";
import RegisterRouter from "./src/routers/register-router";
import AuthorizationMiddleware
  from "./src/middlewares/authorization-middleware";
import createRelationships from "./src/config/db-relationships";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
createRelationships();
app.use(RegisterRouter);
app.use(AuthorizationMiddleware);
app.use(apiErrorHandler);
app.listen(process.env.PORT || 3001);
