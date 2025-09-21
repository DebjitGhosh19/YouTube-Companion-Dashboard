const { oauth2Client } = require("../config/googleConfig");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    if (req.session.tokens) {
      oauth2Client.setCredentials(req.session.tokens);
      return next();
    }

    if (req.session.userId) {
      const user = await User.findById(req.session.userId);
      if (user) {
        oauth2Client.setCredentials({
          access_token: user.accessToken,
          refresh_token: user.refreshToken,
          expiry_date: user.tokenExpiry ? user.tokenExpiry.getTime() : null,
        });
        return next();
      }
    }

    return res.status(401).json({ error: "Not authenticated with YouTube" });
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(500).json({ error: "Auth middleware failed" });
  }
};
