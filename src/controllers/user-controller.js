import ApiError from "../error/api-error";
import UserService from "../services/user-service";
import authentication from "../utils/token-generator";
import CategoryRepository from "../repositories/category-repository";
import PossibleAnswerRepository
  from "../repositories/possible-answer-repository";
import QuestionRepository from "../repositories/question-repository";

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
      res.json({
        token: token
      });
    }
  }
};

// reset password

export default {
  storeUser,
  showLogin
};
