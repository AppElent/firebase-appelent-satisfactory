import React, { useContext, useState } from 'react';

export const AppCacheContext = React.createContext({});

export const useAppCache = () => (useContext(AppCacheContext));

export const AppCacheContextProvider = ({ children, defaultValue }) => {
  const [cacheState, setCacheState] = useState(defaultValue);
  const set = (key, value) => {
    console.log(key, value);
    setCacheState((previousState) => ({ ...previousState, [key]: value }));
  };
  const get = (key) => (cacheState[key]);

  const del = (key) => {
    const tempstate = cacheState;
    delete tempstate[key];
    setCacheState(tempstate);
  };

  const value = {
    set,
    get,
    del,
    values: cacheState
  };

  return (
    <>
      <AppCacheContext.Provider value={value}>
        {children}
      </AppCacheContext.Provider>
    </>
  );
};
