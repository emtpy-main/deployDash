import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

// Replace these with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkyyzx5PWWonrJKxAtced8ktb6vqRW2es",
  authDomain: "devops-2b36e.firebaseapp.com",
  projectId: "devops-2b36e",
  storageBucket: "devops-2b36e.firebasestorage.app",
  messagingSenderId: "236695491284",
  appId: "1:236695491284:web:18b977753528b071ad2141"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Force long-polling to avoid CORS/Listen channel issues in some environments
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
