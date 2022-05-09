const generateToken = () => {
  let token = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 24; i++) {
    token += characters.charAt(Math.floor(Math.random() *
        characters.length));
  }
  return token;
};

export default generateToken;
