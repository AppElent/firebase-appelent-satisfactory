import React, { useContext } from 'react';

export const AppSettingsContext = React.createContext({});

export const useAppSettings = () => useContext(AppSettingsContext);
