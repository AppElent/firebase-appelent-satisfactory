// import { SnackbarProvider } from 'notistack';
import { useRoutes } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

// Custom:
import {
  appsettings, AppSettingsContext
} from './configuration';
import useAuth, { FirebaseContext } from './configuration_firebase';
import i18n, { I18nextProvider } from './configuration_i18next';
import { QueryClientProvider, queryClient } from './configuration_react-query';
import { SocketIOProvider, socketIoOptions } from './configuration_socketio';
import routes from './configuration_routes';

const CustomAppParent = () => {
  const authdata = useAuth();
  if (authdata.isInitializing) {
    return (<></>);
  }
  return (<CustomApp />);
};

const CustomApp = () => {
  const authdata = useAuth();
  const auth = getAuth();
  const content = useRoutes(routes(auth.currentUser));
  const apiUrl = 'http:';

  return (
    <SocketIOProvider url={apiUrl} opts={socketIoOptions}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <AppSettingsContext.Provider value={{ appsettings }}>
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
