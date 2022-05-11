import User from "../models/user";
import "core-js/stable";
import "regenerator-runtime/runtime";
import passwordToken from "../utils/password-token";

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

const findByPasswordToken = async (passwordToken) => {
  return await User.findOne({
    where: {
      forgottenPasswordToken: passwordToken
    }
  });
};

const findByConfirmationToken = async (confirmationToken) => {
  return await User.findOne({
    where: {
      confirmationToken: confirmationToken
    }
  });
};

export default {
  create,
  findByEmail,
  findByUsername,
  findById,
  findByConfirmationToken,
  findByPasswordToken
};

