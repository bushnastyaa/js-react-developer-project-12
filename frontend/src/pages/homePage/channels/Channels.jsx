import React from 'react';
import { Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { PlusSquare } from 'react-bootstrap-icons';
import Channel from './Channel.jsx';

function Channels() {
  const { channels, currentChannelId } = useSelector((state) => ({
    channels: Object.values(state.channels.entities),
    currentChannelId: state.channels.currentChannelId,
  }));

  return (
    <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <div className="text-truncate"><b>Каналы</b></div>
        <Button
          variant="link"
          className="p-0 text-primary btn btn-group-vertical"
        >
          <PlusSquare />
          <span className="visually-hidden">+</span>
        </Button>
      </div>

      <ul id="channels-box" className="p-2 nav nav-pills nav-fill overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            currentChannelId={currentChannelId}
            channelData={{ ...channel }}
          />
        ))}
      </ul>
    </Col>
  );
};

export default Channels;
