import User from "../models/user";
import "core-js/stable";
import "regenerator-runtime/runtime";

const create = async (user) => {
  let savedUser = await User.create(user);
  return savedUser;
};

const findByUsername = async (username) => {
  return await User.findOne({
    where: {
      username: username
    }
  });
};

const findByEmail = async (email) => {
  return await User.findOne({
    where: {
      email: email
    }
  });
};

const findById = async (id) => {
  return await User.findOne({
    where: {
      id: id
    }
  });
};

export default {
  create,
  findByEmail,
  findByUsername,
  findById
};

