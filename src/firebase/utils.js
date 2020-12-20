import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ propt: 'select_acount ' });
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);

export const onAuthStateChange = (callback) =>
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      let data;

      try {
        const userRef = await handleUserProfile(user);
        await userRef.onSnapshot((snapshot) => {
          data = {
            id: snapshot.id,
            ...snapshot.data(),
          };

          return callback(data);
        });
      } catch (err) {
        callback(null);
      }
    } else {
      return callback(null);
    }
  });

export const handleUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const { uid } = userAuth;

  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt: timestamp,
        ...additionalData,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return userRef;
};

export const registerUser = async (email, password, displayName) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    await handleUserProfile(user, { displayName });
  } catch (e) {
    console.log(e);
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.log(err);
  }
};
