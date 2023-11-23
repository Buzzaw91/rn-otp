import { onRequest } from "firebase-functions/v2/https";
import * as admin from 'firebase-admin';
import twilio from 'twilio';
import { defineString } from 'firebase-functions/params';

// Define Twilio configuration parameters (without immediately calling .value())
const twilioAccountSid = defineString('TWILIO_ACCOUNT_SID');
const twilioAuthToken = defineString('TWILIO_AUTH_TOKEN');

function initializeTwilioClient() {
  const accountSid = twilioAccountSid.value();
  const authToken = twilioAuthToken.value();

  if (!accountSid || !authToken) {
    throw new Error('Twilio credentials are not properly set.');
  }

  return new twilio.Twilio(accountSid, authToken);
}
// Utility function to generate OTP
function generateOtp() {
  return Math.floor(Math.random() * 8999 + 1000);
}

// Function to send OTP SMS
async function sendOtpSms(phone: string, code: number) {
  const twilioClient = initializeTwilioClient();
  const fromNumber = '+358454909714'; // Replace with your number or fetch from config
  await twilioClient.messages.create({
    body: `Your code is ${code}`,
    to: phone,
    from: fromNumber
  });
}

// Function to save OTP to Firestore
async function saveOtpToFirestore(phone: string, code: number) {
  const userRef = admin.database().ref('users/' + phone);
  await userRef.update({ code: code, codeValid: true });
}

// Cloud Function to handle OTP requests
export const requestOtp = onRequest(async (request, response) => {
  try {
    const phone = String(request.body.phone).replace(/[^\d]/g, "");
    if (!phone) {
      response.status(422).send({ error: 'Invalid phone number' });
      return;
    }

    const code = generateOtp();
    await sendOtpSms(phone, code);
    await saveOtpToFirestore(phone, code);

    response.send({ success: true });
  } catch (err) {
    console.error(err); // Log the error for debugging
    response.status(422).send({ error: 'Unable to process request' });
  }
});
