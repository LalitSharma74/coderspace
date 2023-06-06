const jwt = require("jsonwebtoken");
const refreshTokenModel = require("../models/refreshTokenModel");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "1y",
    });
    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token, userId) {
    try {
      await refreshTokenModel.create({
        token,
        userId,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new TokenService();
