import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ propt: 'select_acount ' });

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
    const userRoles = ['user'];

    try {
      await userRef.set({
        displayName,
        email,
        createdAt: timestamp,
        userRoles,
        ...additionalData,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return userRef;
};
