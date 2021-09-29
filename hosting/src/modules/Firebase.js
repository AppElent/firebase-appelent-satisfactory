import React, { useContext, useEffect, useState } from 'react';
import {
  getAuth, onAuthStateChanged
} from 'firebase/auth';

const useAuth = () => {
  const [authData, setAuthData] = useState({
    user: undefined,
    isInitializing: true,
    ref: null,
    userDataRef: null,
    userInfo: {},
  });
  const auth = getAuth();

  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (returnedUser) => {
      // clearCache(setCacheData);
      // const ref = null;
      // let userDataRef = null;
      if (returnedUser) {
        // ref = firebase
        //  .firestore()
        //  .doc(`/env/${process.env.REACT_APP_FIRESTORE_ENVIRONMENT}/users/${returnedUser.uid}`);
        // userDataRef = ref.collection('config');
      }
      console.log('User auth wijziging', returnedUser);
      setAuthData({
        ...authData, user: returnedUser, isInitializing: false// , ref, userDataRef
      });
    });
    // unsubscribe to the listener when unmounting
    return () => unsubscribe();
  }, []); // eslint-disable-line

  return authData;
};

export const FirebaseContext = React.createContext({});

export const useSession = () => useContext(FirebaseContext); // eslint-disable-line

export default useAuth;
