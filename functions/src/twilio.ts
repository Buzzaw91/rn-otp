import twilio from 'twilio';
import functions from 'firebase-functions';

// Load dotenv only in local environment
if (!process.env.GCLOUD_PROJECT) {
  require('dotenv').config();
}

let accountSid: string | undefined;
let authToken: string | undefined;

if (process.env.FUNCTIONS_EMULATOR) {
  // Local development
  accountSid = process.env.TWILIO_ACCOUNT_SID;
  authToken = process.env.TWILIO_AUTH_TOKEN;
} else {
  // Deployed environment
  accountSid = functions.config().twilio.account_sid;
  authToken = functions.config().twilio.auth_token;
}

// Error handling for missing credentials
if (!accountSid || !authToken) {
  throw new Error('Twilio credentials are not properly set.');
}

export default new twilio.Twilio(accountSid, authToken);
