import * as admin from 'firebase-admin'
import { onRequest } from "firebase-functions/v2/https";
// import { createUser } from "./create_user";
// import{ requestOtp } from "./request_otp";
import serviceAccount from '../service_account.json'
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

// export { createUser, requestOtp };


exports.simpleTest = onRequest((request, response) => {
  response.send("This is a simple test function.");
});
