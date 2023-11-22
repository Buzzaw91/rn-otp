import { onRequest } from "firebase-functions/v2/https";
import * as admin from 'firebase-admin';
import { twilioClient } from './twilio'

const twilio =  twilioClient;

export const requestOtp = onRequest(async (request, response): Promise<void> => {
 if (!request.body.phone) {
   response.status(422).send({ error: 'You must provide a phone number' });
   return;
 }
 const phone = String(request.body.phone).replace(/[^\d]/g, "");

 admin.auth().getUser(phone)
  .then(userRecord => {
    const code = Math.floor(Math.floor(Math.random() * 8999 + 1000));

    twilio.messages.create({
      body: `Your code is ${code}`,
      to: phone,
      from: '+358454909714'
    }, (err) => {
      if (err) {
        response.status(422).send({ error: err });
      } else {
        admin.database().ref('users/' + phone)
          .update({ code: code, codeValid: true }, () => {
            response.send({ success: true });
          });
        }
    });
  })
  .catch((err) => {
    // TODO: Once confirmed working, change message to "User not found"
    response.status(422).send({ error: err });
  })

})