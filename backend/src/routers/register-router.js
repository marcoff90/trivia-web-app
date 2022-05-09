import {Router} from 'express';
import UserController from "../controllers/user-controller";

const RegisterRouter = Router();

RegisterRouter.post('/api/registration', UserController.storeUser);

RegisterRouter.post('/api/login', UserController.showLogin);

RegisterRouter.post('/api/users/forgotten-password',
    UserController.forgottenPassword);

RegisterRouter.post('/api/users', UserController.resetPassword);

export default RegisterRouter;
