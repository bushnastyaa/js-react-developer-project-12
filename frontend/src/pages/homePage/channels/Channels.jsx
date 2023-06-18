import React from 'react';
import { Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import Channel from './Channel.jsx';

const Channels = ({ handleOpen }) => {
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector((state) => ({
    channels: Object.values(state.channels.entities),
    currentChannelId: state.channels.currentChannelId,
  }));
  const handleAdd = () => handleOpen('addChannel');
  const handleRename = (id) => handleOpen('renameChannel', id);
  const handleRemove = (id) => handleOpen('removeChannel', id);

  return (
    <Col xs={4} md={3} className="border-end p-0 bg-light d-flex flex-column">
      <div className="ps-3 pe-2 pt-5 pb-2 d-flex justify-content-between align-items-center">
        <div className="text-truncate"><b>{t('chat.channels')}</b></div>
        <Button
          variant="link"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={handleAdd()}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>

      <ul id="channels-box" className="p-2 nav nav-pills nav-fill overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            handleRename={handleRename}
            handleRemove={handleRemove}
            currentChannelId={currentChannelId}
            channelData={{ ...channel }}
          />
        ))}
      </ul>
    </Col>
  );
};

export default Channels;
