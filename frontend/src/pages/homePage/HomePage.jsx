import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import { actions as channelsActions } from '../../slices/channelsSlice.js';
import { actions as messagesActions } from '../../slices/messagesSlice.js';
import fetchData from '../../routes/fetchData';
import Channels from './channels/Channels.jsx';
import Messages from './messages/Messages.jsx';

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData()
      .then((data) => {
        const { channels, currentChannelId, messages } = data;

        dispatch(messagesActions.addMessages(messages));
        dispatch(channelsActions.addChannels(channels));
        dispatch(channelsActions.setCurrentChannel(currentChannelId));
      });
  });

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default HomePage;
