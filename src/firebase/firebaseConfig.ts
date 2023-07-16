import { initializeApp, cert } from "firebase-admin/app";
import { ServiceAccount } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

import credentials from "./privateKey.json";

const serviceAccountKey = credentials as ServiceAccount;

const app = initializeApp({
    credential: cert(serviceAccountKey),
});

const auth = getAuth(app);

export default auth;
