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
    const ref = admin.database().ref('users/' + phone);
    const snapshot = await ref.once('value');
    const user = snapshot.val();

    if (user.code !== code || !user.codeValid) {
      response.status(422).send({ error: 'Code not valid' });
      return;
    }

    await ref.update({ codeValid: false });
    const token = await admin.auth().createCustomToken(phone);
    response.send({ token });

  } catch (err) {
    console.error(err);
    response.status(422).send({ error: err });
  }
});
