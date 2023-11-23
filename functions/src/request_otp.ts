import { onRequest } from "firebase-functions/v2/https";
import * as admin from 'firebase-admin';
import { twilioClient } from './twilio';

// Extracted as a utility function
function generateOtp() {
  return Math.floor(Math.random() * 8999 + 1000);
}

async function sendOtpSms(phone: string, code: number) {
  const fromNumber = '+358454909714';
  // or from a config file
  await twilioClient.messages.create({
    body: `Your code is ${code}`,
    to: phone,
    from: fromNumber
  });
}

async function saveOtpToFirestore(phone: string, code: number) {
  const userRef = admin.database().ref('users/' + phone);
  await userRef.update({ code: code, codeValid: true });
}

export const requestOtp = onRequest(async (request, response) => {
  try {
    const phone = String(request.body.phone).replace(/[^\d]/g, "");
    if (!phone) {
      response.status(422).send({ error: 'Invalid phone number' });
      return;
    }

    const userRecord = await admin.auth().getUser(phone);
    const code = generateOtp();

    await sendOtpSms(phone, code);
    await saveOtpToFirestore(phone, code);

    response.send({ success: true });
  } catch (err) {
    console.error(err); // Log the error for debugging
    response.status(422).send({ error: 'Unable to process request' });
  }
});
