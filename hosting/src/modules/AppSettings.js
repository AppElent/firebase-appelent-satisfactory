import React, { useContext, useState } from 'react';

export const AppSettingsContext = React.createContext({});

export const useAppSettings = () => useContext(AppSettingsContext);

export const AppSettingsContextProvider = ({ children, defaultValue }) => {
  const [cacheState, setCacheState] = useState(defaultValue);
  const set = (key, value) => {
    console.log(key, value);
    setCacheState((previousState) => ({ ...previousState, [key]: value }));
  };
  const get = (key) => (cacheState[key]);

  const value = {
    set,
    get,
    values: cacheState
  };

  return (
    <>
      <AppSettingsContext.Provider value={value}>
        {children}
      </AppSettingsContext.Provider>
    </>
  );
};
