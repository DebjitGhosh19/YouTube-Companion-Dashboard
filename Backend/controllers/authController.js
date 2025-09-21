const { oauth2Client, SCOPES } = require("../config/googleConfig");
const Token = require("../models/tokenModel"); // optional legacy
const User = require("../models/User");
const { google } = require("googleapis");

// @desc Redirect to Google login
exports.auth = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline", // ensures refresh_token is returned
    scope: SCOPES,
    prompt: "consent", // always ask to refresh permissions
  });
  res.redirect(url);
};

// @desc Handle Google OAuth2 callback
exports.oauth2callback = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) return res.status(400).json({ error: "Missing authorization code" });

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Fetch user profile info from Google
    const oauth2 = google.oauth2({ auth: oauth2Client, version: "v2" });
    const { data: profile } = await oauth2.userinfo.get();

    // Save or update User in MongoDB
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      user = new User({
        googleId: profile.id,
        email: profile.email,
        name: profile.name,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        tokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
      });
    } else {
      user.accessToken = tokens.access_token;
      if (tokens.refresh_token) user.refreshToken = tokens.refresh_token; // only update if provided
      user.tokenExpiry = tokens.expiry_date ? new Date(tokens.expiry_date) : user.tokenExpiry;
    }

    await user.save();

    // Optional: still save to Token collection (legacy / debugging)
    if (tokens.refresh_token) {
      await Token.deleteMany({});
      await Token.create(tokens);
    }

    // Store in session
    req.session.tokens = tokens;
    req.session.userId = user._id;

    res.json({
      message: "Authentication successful",
      user,
    });
  } catch (error) {
    console.error("OAuth2 Callback Error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};
