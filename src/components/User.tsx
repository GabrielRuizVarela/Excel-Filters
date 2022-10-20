import React from 'react';

// import styled from 'styled-components';
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import SignIn from './SignIn';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'excel-filters.firebaseapp.com',
  projectId: 'excel-filters',
  storageBucket: 'excel-filters.appspot.com',
  messagingSenderId: '842563428660',
  appId: '1:842563428660:web:89a86c24caa2c6ccb84561',
  measurementId: 'G-V6PY6PTFL1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export const FirebaseContext = React.createContext(auth);

export default function User() {
  // const auth = useAppSelector((state) => state.firebase.auth);
  return (
    <FirebaseContext.Provider value={auth}>
      <SignIn />
    </FirebaseContext.Provider>
  );
}
