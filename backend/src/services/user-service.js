import UserRepository from "../repositories/user-repository";
import bcrypt from "bcrypt";
import TokenGenerator from "../utils/password-token";
import Mailer from "../utils/mailer";

const create = async (user) => {
  user.password = bcrypt.hashSync(user['password'], 5);
  let token = await TokenGenerator.generateConfirmationToken();
  let expiration = Math.round(Date.now() / 1000 + 86400);
  user['confirmationToken'] = token;
  user['confirmationTokenExpiration'] = expiration;
  let savedUser = await UserRepository.create(user);
  Mailer.sendConfirmationMail(user.email, token, user.username);
  return savedUser;
};

const confirmAccount = async (confirmationToken, avatar) => {
  let user = await UserRepository.findByConfirmationToken(confirmationToken);
  user['active'] = true;
  user['avatar'] = avatar;
  user['confirmationToken'] = null;
  user['confirmationTokenExpiration'] = null;
  await user.save();
  return user;
};

const generateNewConfirmationToken = async (confirmationToken) => {
  let user = await UserRepository.findByConfirmationToken(confirmationToken);
  let token = await TokenGenerator.generateConfirmationToken();
  let expiration = Math.round(Date.now() / 1000 + 86400);
  user['confirmationToken'] = token;
  user['confirmationTokenExpiration'] = expiration;
  Mailer.sendConfirmationMail(user.email, token, user.username);
  await user.save();
  return token;
};

const isUserNameTaken = async (username) => {
  return await UserRepository.findByUsername(username) !== null;
};

const isEmailUsed = async (email) => {
  return await UserRepository.findByEmail(email) !== null;
};

const login = async (user) => {
  let userInDb = await UserRepository.findByUsername(user.username);
  let doesPasswordMatch =  userInDb && bcrypt.compareSync(user['password'], userInDb['password']);
  return doesPasswordMatch ? userInDb : null;
};

const forgottenPassword = async (userEmail) => {
  let user = await UserRepository.findByEmail(userEmail);
  let token = await TokenGenerator.generatePasswordToken();
  let expiration = Math.round(Date.now() / 1000 + 86400);
  user['forgottenPasswordToken'] = token;
  user['forgottenPasswordTokenExpiration'] = expiration
  await user.save();
  Mailer.sendPasswordResetMail(userEmail, token, user.username);
};

const resetPassword = async (userEmail, password) => {
  let user = await UserRepository.findByEmail(userEmail);
  user['password'] = bcrypt.hashSync(password, 5);
  user['forgottenPasswordToken'] = null;
  user['forgottenPasswordTokenExpiration'] = null;
  user['active'] = true;
  Mailer.confirmPasswordChange(user['email'], user['username']);
  await user.save();
};

const findById = async (id) => {
  return await UserRepository.findById(id);
};

const findByEmail = async (email) => {
  return await UserRepository.findByEmail(email);
};

const findByPasswordToken = async (passwordToken) => {
  return await UserRepository.findByPasswordToken(passwordToken);
};

const findByConfirmationToken = async (confirmationToken) => {
  return await UserRepository.findByConfirmationToken(confirmationToken);
};

const getUsersAvatar = async (userId) => {
  let user = await UserRepository.findById(userId);
  return user['avatar'];
};

export default {
  create,
  isEmailUsed,
  isUserNameTaken,
  login,
  findById,
  forgottenPassword,
  resetPassword,
  findByEmail,
  findByConfirmationToken,
  findByPasswordToken,
  confirmAccount,
  generateNewConfirmationToken,
  getUsersAvatar
};
