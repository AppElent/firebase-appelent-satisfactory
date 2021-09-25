import React, { useContext } from 'react';

/**
 * Static settings
 */
export const appsettings = {
  appname: 'test123',
  description: '',
  environment: '',
  backendUrl: 'htttp://localhost:3000'
};
const getEnvironment = () => 'development';
appsettings.environment = getEnvironment();

export const AppSettingsContext = React.createContext({});

export const setAppSettings = (setFunction) => (key, data) => {
  setFunction((state) => ({ ...state, [key]: data }));
};

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);
  return { context, setAppSettings };
};

/**
 * HTTPS redirect
 */
if (window.location.protocol !== 'https:' && process.env.NODE_ENV !== 'development') {
  window.location.href = `https:${window.location.href.substring(window.location.protocol.length)}`;
}
