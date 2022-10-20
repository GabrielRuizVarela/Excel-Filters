import React from 'react';

// import styled from 'styled-components';
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import SignIn from './SignIn';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "excel-filters-d713f.firebaseapp.com",
  projectId: "excel-filters-d713f",
  storageBucket: "excel-filters-d713f.appspot.com",
  messagingSenderId: "718303504200",
  appId: "1:718303504200:web:d8f3ab686dd37b41b7f57d",
  measurementId: "G-DCQ8SWEV07"
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
