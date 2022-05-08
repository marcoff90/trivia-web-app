import jwt from "jsonwebtoken";

const authentication = async (user) => {

  if (!user.username || !user.password) {
    return null;
  }

  let privateKey = process.env.ACCESS_TOKEN_SECRET;
  return await jwt.sign({
    id: user.id,
    username: user.username
  }, privateKey, {expiresIn: "2h"});
};

export default authentication;
