import UserRepository from "../repositories/user-repository";
import bcrypt from "bcrypt";

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

const findById = async (id) => {
  return await UserRepository.findById(id);
};

export default {
  create,
  isEmailUsed,
  isUserNameTaken,
  login,
  findById
};
