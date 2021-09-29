import React, {
  useState, useContext, useEffect, useRef
} from 'react';
import io from 'socket.io-client';

export const SocketIOContext = React.createContext(undefined);

// export const useSocket = (): any => useContext(SocketIOContext); // eslint-disable-line
export const socketIoOptions = { query: { token: '' } };

export { io };

export const SocketIOProvider = ({ url, opts, children }) => {
  const socketRef = useRef();

  if (!socketRef.current) {
    if (opts.start) socketRef.current = io(url, opts || {});
  }

  return <SocketIOContext.Provider value={socketRef.current}>{children}</SocketIOContext.Provider>;
};

export const useSocket = (eventKey, callback) => {
  const socket = useContext(SocketIOContext);
  const [lastMessage, setLastMessage] = useState();

  const eventCallback = async (data) => {
    console.log(data);
    setLastMessage(data);
    if (callback) callback(data);
  };

  const subscribe = () => {
    if (eventKey) {
      socket.on(eventKey, eventCallback);
    }
  };

  const unsubscribe = () => {
    if (eventKey) {
      socket.removeListener(eventKey, eventCallback);
    }
  };

  useEffect(() => {
    subscribe();

    return unsubscribe;
  }, [eventKey]);

  return {
    lastMessage, socket, unsubscribe, subscribe
  };
};
