import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' }; // your Firebase private key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
