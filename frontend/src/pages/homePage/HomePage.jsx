import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import { actions as channelsActions } from '../../slices/channelsSlice.js';
import { actions as messagesActions } from '../../slices/messagesSlice.js';
import { open, close } from '../../slices/modalSlice.js';
import fetchData from '../../routes/fetchData';
import Channels from './channels/Channels.jsx';
import Messages from './messages/Messages.jsx';
import Modal from '../../components/modal/Modal.jsx';
import useChat from '../../hooks/useChat';

const HomePage = () => {
  const dispatch = useDispatch();
  const { connectSocket } = useChat();

  useEffect(() => {
    fetchData()
      .then((data) => {
        connectSocket();
        const { channels, currentChannelId, messages } = data;

        dispatch(messagesActions.addMessages(messages));
        dispatch(channelsActions.addChannels(channels));
        dispatch(channelsActions.setCurrentChannel(currentChannelId));
      });
  }, [connectSocket, dispatch]);

  const handleOpen = (type, id = null) => {
    dispatch(open({ type, id }));
  };

  const handleClose = () => {
    dispatch(close());
  };

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels handleOpen={handleOpen} />
          <Messages />
        </Row>
      </Container>
      <Modal onHide={handleClose} />
    </>
  );
};

export default HomePage;
