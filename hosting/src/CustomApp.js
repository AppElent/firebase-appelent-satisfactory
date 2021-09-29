import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

// import { SnackbarProvider } from 'notistack';
import { useRoutes } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Custom:
import { AppSettingsContext } from './modules/AppSettings';
import useAuth, { FirebaseContext } from './modules/Firebase';
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

const CustomAppParent = () => {
  const authdata = useAuth();
  if (authdata.isInitializing) {
    return (<></>);
  }

  /**
   * HTTPS redirect
   */
  if (window.location.protocol !== 'https:' && process.env.NODE_ENV !== 'development') {
    window.location.href = `https:${window.location.href.substring(window.location.protocol.length)}`;
  }
  return (<CustomApp />);
};

const CustomApp = () => {
  // Set auth listener
  const authdata = useAuth();

  // Get auth data from Firebase
  const auth = getAuth();

  // Get routes from module file
  const content = useRoutes(routes(auth.currentUser));

  // Set default app settings
  const [appsettings, setAppSettings] = useState({
    appname: 'Satisfactory Management',
    description: 'Keep track of your factories',
    environment: '',
    backendUrl: 'htttp://localhost:3000'
  });

  // Initialize queryclient from react-query
  const queryClient = new QueryClient();

  return (
    <SocketIOProvider url="" opts={socketIoOptions}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <AppSettingsContext.Provider value={{ appsettings, setAppSettings }}>
            <FirebaseContext.Provider value={authdata}>
              {/* <CacheContext.Provider
                value={{
                  data: cacheData,
                  get: getCache(cacheData),
                  set: setCache(setCacheData),
                  clear: clearCache(setCacheData),
                  clearKey: clearKey(setCacheData),
                }}
              > */}
              {/* <SnackbarProvider maxSnack={3}> Kapot vanwege nnieuwe MUI versie, later checken */}
              {content}
              {/* </SnackbarProvider> */}
              {/* </CacheContext.Provider> */}
            </FirebaseContext.Provider>
          </AppSettingsContext.Provider>
        </I18nextProvider>
      </QueryClientProvider>
    </SocketIOProvider>
  );
};

export default CustomAppParent;
