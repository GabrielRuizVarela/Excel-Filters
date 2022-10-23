import React from 'react';

// import styled from 'styled-components';
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth, User } from 'firebase/auth';
import styled from 'styled-components';
import SignIn from './SignIn';
import UserPresets from './UserPresets';

const StyledUserSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  width: 100%;
  padding: 2rem;
  justify-items: space-between;

`;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'excel-filters-d713f.firebaseapp.com',
  projectId: 'excel-filters-d713f',
  storageBucket: 'excel-filters-d713f.appspot.com',
  messagingSenderId: '718303504200',
  appId: '1:718303504200:web:d8f3ab686dd37b41b7f57d',
  measurementId: 'G-DCQ8SWEV07',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export const FirebaseContext = React.createContext(auth);

export default function UserSection() {
  // const auth = useAppSelector((state) => state.firebase.auth);
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return unsubscribe;
  }, [auth]);
  const Usercallback = (u: User | null) => setUser(u);

  return (
    <FirebaseContext.Provider value={auth}>
      <StyledUserSection className="UserSection">
        {user ? <UserPresets user={user} /> : null}
        <SignIn parentCallback={Usercallback} className='signIn' />
      </StyledUserSection>
    </FirebaseContext.Provider>
  );
}
