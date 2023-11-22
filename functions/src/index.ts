

import * as admin from 'firebase-admin'
import { createUser } from "./create_user";
import{ requestOtp } from "./request_otp";
// imporServiceAccount
import serviceAccount from '../service_account.json'
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

export { createUser, requestOtp };