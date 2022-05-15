import {Router} from 'express';
import UserController from "../controllers/user-controller";

const RegisterRouter = Router();

RegisterRouter.post('/api/registration', UserController.storeUser);

RegisterRouter.post('/api/login', UserController.showLogin);

RegisterRouter.post('/api/users/forgotten-password',
    UserController.forgottenPassword);

RegisterRouter.post('/api/users/recover', UserController.resetPassword);

RegisterRouter.post('/api/users/activate', UserController.activateAccount);

RegisterRouter.get('/api/users/welcome', UserController.welcomeUser);

RegisterRouter.get('/api/users/identify', UserController.identifyUserByResetToken)

export default RegisterRouter;
