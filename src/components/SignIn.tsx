import React, { useContext } from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  User,
  AuthError,
  signOut,
} from 'firebase/auth';
import { FirebaseContext } from './User';

const provider = new GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

function handleSignOut(auth: any, setUser: any) {
  signOut(auth)
    .then(() => {
      console.log('Signed out');
      setUser(null);
    })
    .catch((error: AuthError) => {
      console.log(error);
    });
}

export default function SignIn() {
  const auth = useContext(FirebaseContext);
  // const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [user, setUser] = React.useState<User | null>(null);
  const [error, setError] = React.useState<AuthError | null>(null);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (user) {
    return (
      <div>
        <div>Logged in as {user.displayName}</div>
        {/* display user photo */}
        <img src={user.photoURL || '#'} alt="user" />
        <button type="button" onClick={() => handleSignOut(auth, setUser)}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* <button type='button' onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}> */}
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
