import React, { useContext } from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  User,
  AuthError,
  signOut,
} from 'firebase/auth';
import { FirebaseContext } from './UserSection';

const provider = new GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

function handleSignOut(auth: any, setUser: any) {
  signOut(auth)
    .then(() => {
      // console.log('Signed out');
      setUser(null);
    })
    .catch((error: AuthError) => {
      console.log(error);
    });
}

export default function SignIn({ parentCallback }: any) {
  const auth = useContext(FirebaseContext);
  const [user, setUser] = React.useState<User | null>(null);
  const [error, setError] = React.useState<AuthError | null>(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      parentCallback(u);
    });
    return unsubscribe;
  }, [auth]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (user) {
    return (
      <div>
        <div>Logged in as {user.displayName}</div>
        <img src={user.photoURL || '#'} alt="user" />
        <button type="button" onClick={() => handleSignOut(auth, setUser)}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div>
      <input
        type="button"
        onClick={() => {
          signInWithPopup(auth, provider)
            .then((result: UserCredential) => {
              setUser(result.user);
            })
            .catch((e) => setError(e));
        }}
        value="Sign in with Google"
      />
    </div>
  );
}
