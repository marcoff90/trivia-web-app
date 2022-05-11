import ApiError from "../error/api-error";
import UserService from "../services/user-service";
import authentication from "../utils/token-generator";
import bcrypt from "bcrypt";

const storeUser = async (req, res, next) => {
  let user = req.body;
  let passwordRegex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$";

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    next(ApiError.badRequest("User must be defined!"));

  } else if (!user.username) {
    next(ApiError.badRequest('Username must be defined!'));

  } else if (!user.email) {
    next(ApiError.badRequest('Email must be defined!'));

  } else if (!user.password) {
    next(ApiError.badRequest('Password must be defined!'));

  } else if (!user.password.match(passwordRegex)) {
    next(ApiError.badRequest("Password doesn't match requirements!"));

  } else if (await UserService.isUserNameTaken(user.username)) {
    next(ApiError.conflict('Username already taken!'));

  } else if (await UserService.isEmailUsed(user.email)) {
    next(ApiError.conflict('Email is already used!'));

  } else if (user.username.length < 5) {
    next(ApiError.badRequest('Username must be at least 5 characters!'))

  } else {
    let savedUser = await UserService.create(user);
    res.json({
      createdUser: {
        id: savedUser.id,
        username: savedUser.username
      }
    });
  }
};

const showLogin = async (req, res, next) => {
  let user = req.body;

  if (!user.username) {
    next(ApiError.badRequest('Username must be defined!'));

  } else if (!user.password) {
    next(ApiError.badRequest('Password must be defined!'));

  } else {
    let loggedUser = await UserService.login(user);

    let token = loggedUser !== null ? await authentication(loggedUser) : null;

    if (!token) {
      next(ApiError.unauthorized("At least one of the fields doesn't match!"));

    } else {
      if (!loggedUser['active']) {
        next(ApiError.forbidden('Confirm the account through email confirmation!'));

      } else {

      res.json({
        token: token
      });
    }
  }
}
}
;

const forgottenPassword = async (req, res, next) => {
  let userEmail = req.body.email;
  let user;

  if (!userEmail) {
    next(ApiError.badRequest('Email must be defined!'));
  } else {
    user = await UserService.findByEmail(userEmail)
  }

  if (!user) {
    next(ApiError.badRequest("Email doesn't match any user"));

  } else {
    await UserService.forgottenPassword(userEmail);
    res.json('Email with reset link sent');
  }
};

const resetPassword = async (req, res, next) => {
  let userEmail = req.body['email'];
  let password = req.body['password'];
  let passwordRegex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$";
  let user;
  let token = req.query['token'];
  let timeNow = Date.now() / 1000;

  if (!userEmail) {
    next(ApiError.badRequest('Email must be defined!'));

  } else {
    user = await UserService.findByEmail(userEmail);
  }

  if (!password) {
    next(ApiError.badRequest('Password must be defined!'));

  } else if (!user.password.match(passwordRegex)) {
    next(ApiError.badRequest("Password doesn't match requirements!"));

  } else if (!user) {
    next(ApiError.badRequest("Email doesn't match any user"));

  } else if (bcrypt.compareSync(password, user['password'])) {
    next(ApiError.badRequest("Password cannot be same as it was!"));

  } else if (user['forgottenPasswordToken'] !== token) {
    next(ApiError.badRequest("Token doesn't match!"));

  } else if (timeNow > user['forgottenPasswordTokenExpiration']) {
    next(ApiError.badRequest('Token expired!'));

  } else {
    await UserService.resetPassword(userEmail, password);
    res.json('Password changed successfully!');
  }
};

const activateAccount = async (req, res, next) => {
  let confirmationToken = req.query['confirmation'];
  let avatar = req.body['avatar'];
  let timeNow = Date.now() / 1000;

  if (!confirmationToken) {
    next(ApiError.badRequest('Confirmation token must be provided!'));
  }

  if (!avatar) {
    next(ApiError.badRequest('Avatar must be provided!'));

  } else {
    let user = await UserService.findByConfirmationToken(confirmationToken);
    console.log(user);

    if (!user) {
      next(ApiError.notFound('Token not assigned to user!'));

    } else if (timeNow > user['confirmationTokenExpiration']) {
      let newToken = await UserService.generateNewConfirmationToken(
          confirmationToken);
      if (newToken) {
        res.json('Token expired! Check email for new one!');
      }

    } else {
      let user = await UserService.confirmAccount(confirmationToken, avatar);
      res.json({
        username: user['username'],
        active: user['active'],
        avatar: user['avatar']
      });
    }
  }
};

export default {
  storeUser,
  showLogin,
  forgottenPassword,
  resetPassword,
  activateAccount
};
