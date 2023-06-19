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
import useAuth from '../../hooks/useAuth';

const HomePage = () => {
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();

  useEffect(() => {
    fetchData(getAuthHeader)
      .then((data) => {
        const { channels, currentChannelId, messages } = data;

        dispatch(messagesActions.addMessages(messages));
        dispatch(channelsActions.addChannels(channels));
        dispatch(channelsActions.setCurrentChannel(currentChannelId));
      });
  });

  const handleOpen = (type, id = null) => () => {
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
