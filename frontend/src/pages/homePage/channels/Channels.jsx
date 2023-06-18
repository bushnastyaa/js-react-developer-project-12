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
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <Button
          variant="link"
          className="p-0 text-primary btn-group-vertical"
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
