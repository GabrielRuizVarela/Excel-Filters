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
      <div className="flex items-center w-fit py-4 justify-self-end">
        <div className="avatar px-4">
          <div
            className="w-24 rounded-full 
          ring ring-accent ring-offset-base-100 ring-offset-1"
          >
            <img src={user.photoURL || '#'} alt="user" />
          </div>
        </div>
        <div className="flex flex-col items-center p-4">
          <div className="text-white text-sm"> {user.displayName}</div>
          <button
            className="btn btn-outline btn-xs text-white"
            type="button"
            onClick={() => handleSignOut(auth, setUser)}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-fit py-4 justify-self-end">
      <input
        className="btn btn-xs  text-white bg-accent px-2"
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
      <span><em>*and save presets</em></span>
    </div>
  );
}
