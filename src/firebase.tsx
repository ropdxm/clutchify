import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCIbBBoejIp4_vDEsSaBY5m3goX6MA8W-Q",
  authDomain: "clutchify-23c03.firebaseapp.com",
  projectId: "clutchify-23c03",
  storageBucket: "clutchify-23c03.appspot.com",
  messagingSenderId: "1095973334585",
  appId: "1:1095973334585:web:b804dfa0710ddd2842a7e8"
};

const app = firebase.initializeApp(firebaseConfig);
// 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 OPEN AI API KEY
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default firebase;