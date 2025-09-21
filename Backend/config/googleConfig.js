const { google } = require("googleapis");
require("dotenv").config();

const oauth2Client = new google.auth.OAuth2(
  process.env.YT_CLIENT_ID,
  process.env.YT_CLIENT_SECRET,
  process.env.YT_REDIRECT_URI
);

// Scopes we need for YouTube actions
const SCOPES = ["https://www.googleapis.com/auth/youtube.force-ssl"];

module.exports = { oauth2Client, SCOPES };
