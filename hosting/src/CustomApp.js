import { QueryClient, QueryClientProvider } from 'react-query';

// import { SnackbarProvider } from 'notistack';
import { SnackbarProvider } from 'modules/Snackbar';
import { useRoutes } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore, query, collection, where
} from 'firebase/firestore';

// Custom:
import { ConfirmProvider } from 'modules/ConfirmationDialog';
import { BugFormProvider } from 'modules/BugForm';
import { AppCacheContextProvider, useAppCache } from 'modules/AppCache';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import useLocalStorage from 'hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import { AppSettingsContextProvider } from './modules/AppSettings';
import useAuth from './modules/Firebase';
import i18n, { I18nextProvider } from './modules/I18Next';
import { SocketIOProvider, socketIoOptions } from './modules/SocketIO';
import routes from './modules/Routes';

const firebaseConfig = {
  apiKey: 'AIzaSyAUjs6ab0nLxu8INHNNFKAwnwd96nkpS0Y',
  authDomain: 'appelent-satisfactory.firebaseapp.com',
  projectId: 'appelent-satisfactory',
  storageBucket: 'appelent-satisfactory.appspot.com',
  messagingSenderId: '77073885556',
  appId: '1:77073885556:web:0d0fbdeb290fddc3d46421',
  measurementId: 'G-VNYEG232K0'
};
initializeApp(firebaseConfig);

const CustomAppHttpsRedirect = () => {
  /**
   * HTTPS redirect
   */
  if (window.location.protocol !== 'https:' && process.env.NODE_ENV !== 'development') {
    window.location.href = `https:${window.location.href.substring(window.location.protocol.length)}`;
  }
  return <CustomAppAuth />;
};

const CustomAppAuth = () => {
  const authdata = useAuth();
  if (authdata.isInitializing) {
    return (<></>);
  }

  return (<CustomAppCache />);
};

const CustomAppCache = () => {
  const defaultValue = {};

  return (<AppCacheContextProvider defaultValue={defaultValue}><CustomApp /></AppCacheContextProvider>);
};

const CustomApp = () => {
  // Get auth data from Firebase
  const auth = getAuth();

  // Get routes from module file
  const content = useRoutes(routes(auth.currentUser));

  // Initialize queryclient from react-query
  const queryClient = new QueryClient();

  // Application settings
  const appSettings = {
    appname: 'Satisfactory Management',
    description: 'Keep track of your factories',
    environment: '',
    backendUrl: 'htttp://localhost:3000',
    url: window.location.href
  };

  // Cache
  const { values, set } = useAppCache();
  const db = getFirestore();
  const queryVar = auth.currentUser ? query(collection(db, 'games'), where('players', 'array-contains', auth.currentUser.uid)) : undefined;
  const [games, gamesLoading] = useCollectionData(queryVar, { idField: 'id' });
  const [defaultGame, setDefaultGame, removeDefaultGame] = useLocalStorage('defaultGame');

  const [factoryVars, setFactoryVars] = useState({ query: undefined, options: undefined });
  const [factories, factoriesLoading] = useCollectionData(factoryVars.query, factoryVars.options);

  useEffect(() => {
    // If games are not loading, set variable in cache
    if (!gamesLoading) {
      set('games', games);

      // Check if value is present in games array
      if (defaultGame && games.find((game) => (game.id === defaultGame))) {
        // Do nothing

      } else if (games?.length > 0) {
        // If not present, check if game list > 0 and set the first one in line
        setDefaultGame(games[0].id);
      } else if (games?.length === 0) {
        // If no games, then remove default value
        removeDefaultGame();
      }

      if (defaultGame && games.find((game) => (game.id === defaultGame))) {
        // load factories
        setFactoryVars({
          query: query(collection(db, `games/${defaultGame}/factories`)),
          options: { idField: 'id' }
        });
      }
    }
  }, [games, defaultGame]);

  useEffect(() => {
    if (!factoriesLoading) {
      set('factories', factories);
    }
  }, [factories]);

  console.log('selectedGame', defaultGame);
  console.log(games, defaultGame, factories, values);

  if (gamesLoading) {
    return <></>;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <QueryClientProvider client={queryClient}>
          <ConfirmProvider>
            <BugFormProvider>
              <SocketIOProvider url="" opts={socketIoOptions}>
                <AppSettingsContextProvider defaultValue={appSettings}>
                  {content}
                </AppSettingsContextProvider>
              </SocketIOProvider>
            </BugFormProvider>
          </ConfirmProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </I18nextProvider>
  );
};

export default CustomAppHttpsRedirect;
