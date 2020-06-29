import admin from "firebase-admin"

const serviceAccount = JSON.parse(
  process.env.GOOGLE_APPLICATION_CREDENTIALS || "{}"
)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
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
