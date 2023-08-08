// useFirestoreUser.js
import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { getDoc, doc } from "firebase/firestore";

export function useFirestoreUser(uid) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        console.error('No user data found in Firestore for UID:', uid);
      }
    }

    if (uid) {
      fetchUserData();
    }
  }, [uid]);

  return userData;
}
