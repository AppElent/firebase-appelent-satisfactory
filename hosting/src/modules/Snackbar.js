import React, {
  createContext, useContext, useState
} from 'react';
import { SnackbarProvider as DefaultSnackbarProvider, useSnackbar as useSnackbarDefault } from 'notistack';

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children, ...props }) => {
  const [notifications, setNotifications] = useState([]);
  const addNotification = (notification) => {
    setNotifications((previousState) => [...previousState, notification]);
  };
  return (<><DefaultSnackbarProvider {...props}><SnackbarContext.Provider value={{ notifications, setNotifications, addNotification }}>{children}</SnackbarContext.Provider></DefaultSnackbarProvider></>);
};

export const useSnackbar = () => {
  const defaultSnackbar = useSnackbarDefault();
  const snackbarContext = useContext(SnackbarContext);

  const enqueueSnackbar = (message, props) => {
    console.log(message, props);
    snackbarContext.addNotification({
      message,
      datetime: new Date(),
      location: window.location.href,
      props
    });
    defaultSnackbar.enqueueSnackbar(message, props);
  };
  return { enqueueSnackbar, closeSnackbar: defaultSnackbar.closeSnackbar };
};

export const useSnackbarNotifications = () => useContext(SnackbarContext);
