import UserService from "../services/user-service";

const generatePasswordToken = async () => {
  let token = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 24; i++) {
    token += characters.charAt(Math.floor(Math.random() *
        characters.length));
  }

  // user needs a unique token
  let user = await UserService.findByPasswordToken(token);
  if (user) {
    await generatePasswordToken()
  }

  return token;
};

const generateConfirmationToken = async () => {
  let token = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 24; i++) {
    token += characters.charAt(Math.floor(Math.random() *
        characters.length));
  }

  // user needs a unique token
  let user = await UserService.findByConfirmationToken(token);
  if (user) {
    await generateConfirmationToken()
  }

  return token;
}

export default {
  generatePasswordToken,
  generateConfirmationToken
};
