import { onRequest } from "firebase-functions/v2/https";
import * as admin from 'firebase-admin';

export const verifyOtp = onRequest(async (request, response) => {
  if (!request.body.phone || !request.body.code) {
    response.status(422).send({ error: 'Phone and code must be provided' });
    return;
  }

  const phone = String(request.body.phone).replace(/[^\d]/g, "");
  const code = parseInt(request.body.code);

  try {
    await admin.auth().getUser(phone);
    const userRef = admin.firestore().collection('users').doc(phone);
    const doc = await userRef.get();

    if (!doc.exists) {
      response.status(422).send({ error: 'User not found' });
      return;
    }

    const user = doc.data()! // user is not undefined at point

    if (user.code !== code || !user.codeValid) {
      response.status(422).send({ error: 'Code not valid' });
      return;
    }

    await userRef.update({ codeValid: false });
    const token = await admin.auth().createCustomToken(phone);
    response.send({ token });

  } catch (err) {
    console.error(err);
    response.status(422).send({ error: err });
  }
});
