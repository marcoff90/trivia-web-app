import UserRepository from "../repositories/user-repository";
import bcrypt from "bcrypt";
import generateToken from "../utils/password-token";
import sendPasswordResetMail from "../utils/mailer";

const create = async (user) => {
  user.password = bcrypt.hashSync(user['password'], 5);
  let savedUser = await UserRepository.create(user);
  return savedUser;
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
  let token = generateToken();
  let expiration = Date.now() / 1000 + 86400;
  user['forgottenPasswordToken'] = token;
  user['forgottenPasswordTokenExpiration'] = expiration
  await user.save();
  sendPasswordResetMail(userEmail, token);
};

const resetPassword = async (userEmail, password) => {
  let user = await UserRepository.findByEmail(userEmail);
  user['password'] = bcrypt.hashSync(password, 5);
  user['forgottenPasswordToken'] = null;
  user['forgottenPasswordTokenExpiration'] = null;
  await user.save();
};

const findById = async (id) => {
  return await UserRepository.findById(id);
};

const findByEmail = async (email) => {
  return await UserRepository.findByEmail(email);
}

export default {
  create,
  isEmailUsed,
  isUserNameTaken,
  login,
  findById,
  forgottenPassword,
  resetPassword,
  findByEmail
};
