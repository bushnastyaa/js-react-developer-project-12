import React, {
  createContext,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

export const ChatContext = createContext({});

export const ChatProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('addMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
    });

    socket.on('addChannel', (payload) => {
      dispatch(channelsActions.addChannel(payload));
    });

    socket.on('renameChannel', ({ id, name }) => {
      dispatch(channelsActions.renameChannel({ id, changes: { name } }));
    });

    socket.on('removeChannel', ({ id }) => {
      dispatch(channelsActions.setChannelId(id));
      dispatch(channelsActions.removeChannel(id));
    });
  }, [dispatch, socket]);

  const sendMessage = (data) => {
    socket.emit('addMessage', data);
  };

  const addChannel = (name) => {
    socket.emit('addChannel', { name }, (response) => {
      const { data: { id } } = response;
      dispatch(channelsActions.setCurrentChannel(id));
    });
  };

  const renameChannel = ({ id, name }) => {
    socket.emit('renameChannel', { id, name });
  };

  const removeChannel = (id) => {
    socket.emit('removeChannel', { id });
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    addChannel,
    renameChannel,
    removeChannel,
    sendMessage,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
