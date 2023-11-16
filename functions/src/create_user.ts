import { onRequest } from "firebase-functions/v2/https";
import * as admin from 'firebase-admin';

export const createUser = onRequest(async (request, response): Promise<void> => {
  // Check for the presence of the phone number in the request body
  if (!request.body.phone) {
    response.status(422).send({ error: 'Bad Input' });
    return; // Early return to stop execution after sending response
  }

  // Format the phone number to remove non-numeric characters
  const phone = String(request.body.phone).replace(/[^\d]/g, "");

  try {
    // Create a new user account using the formatted phone number
    const user = await admin.auth().createUser({ uid: phone });
    response.send(user); // Send back the user object
  } catch (err) {
    // Handle any errors that occur during user creation
    response.status(422).send({ error: err });
  }
});
