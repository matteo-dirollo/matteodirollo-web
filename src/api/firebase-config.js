import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "matteo-dirollo-com.firebaseapp.com",
  projectId: "matteo-dirollo-com",
  storageBucket: "matteo-dirollo-com.appspot.com",
  messagingSenderId: "346763449114",
  appId: "1:346763449114:web:6ff5eaeb797b4365ec12a3",
  measurementId: process.env.NEXT_PUBLIC_GA_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Lazily initialize analytics
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage, analytics };
