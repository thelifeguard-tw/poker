import admin, { ServiceAccount } from "firebase-admin"

require("dotenv").config({ path: ".env.local" })

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS_PRIVATE_KEY)
  throw new Error("Google Private Key not found.")

/* eslint-disable  @typescript-eslint/camelcase */
const serviceAccount = {
  type: "service_account",
  project_id: "lifeguards-poker-b7e01",
  private_key_id: "aea645e5f7d0e18608122ad8866cdb2d40def698",
  private_key: process.env.GOOGLE_APPLICATION_CREDENTIALS_PRIVATE_KEY,
  client_email:
    "firebase-adminsdk-n0zgr@lifeguards-poker-b7e01.iam.gserviceaccount.com",
  client_id: "101375034699496597363",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-n0zgr%40lifeguards-poker-b7e01.iam.gserviceaccount.com",
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL: "https://shumiq-anime.firebaseio.com",
})

export const users = async () => {
  const res = await admin.auth().listUsers()
  return res
}

export const verify = async (token: string) => {
  const res = await admin
    .auth()
    .verifyIdToken(token)
    .catch(() => {
      return null
    })
  return res
}
