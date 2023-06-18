import React, {
  createContext,
  useEffect,
  useMemo,
} from 'react';
import store from '../slices';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

export const ChatContext = createContext({});

export const ChatProvider = ({ socket, children }) => {
  useEffect(() => {
    socket.on('addMessage', (payload) => {
      store.dispatch(messagesActions.addMessage(payload));
    });

    socket.on('addChannel', (payload) => {
      store.dispatch(channelsActions.addChannel(payload));
    });

    socket.on('renameChannel', ({ id, name }) => {
      store.dispatch(channelsActions.renameChannel({ id, changes: { name } }));
    });

    socket.on('removeChannel', ({ id }) => {
      store.dispatch(channelsActions.setChannelId(id));
      store.dispatch(channelsActions.removeChannel(id));
    });
  }, [socket]);

  const addChannel = (name) => {
    socket.emit('addChannel', { name }, (response) => {
      const { data: { id } } = response;
      store.dispatch(channelsActions.setCurrentChannel(id));
    });
  };

  const renameChannel = ({ id, name }) => {
    socket.emit('renameChannel', { id, name });
  };

  const removeChannel = (id) => {
    socket.emit('removeChannel', { id });
  };

  const sendMessage = (data) => {
    socket.emit('addMessage', data);
  };

  const value = useMemo(() => ({
    addChannel,
    renameChannel,
    removeChannel,
    sendMessage,
  }));

  return (
    <ChatContext.Provider value={value}>
      { children }
    </ChatContext.Provider>
  );
};
