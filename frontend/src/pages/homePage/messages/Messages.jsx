import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors as channelsSelectors } from '../../../slices/channelsSlice.js';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';

const Messages = () => {
  const { t } = useTranslation();
  const { currentChannelId, allMessages } = useSelector((state) => ({
    currentChannelId: state.channels.currentChannelId,
    allMessages: Object.values(state.messages.entities),
  }));
  const messages = allMessages.filter(({ channelId }) => channelId === currentChannelId);
  const currentChannel = useSelector(
    (state) => channelsSelectors.selectById(state, currentChannelId),
  );

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0 fw-bold">
            #
            {currentChannel.name}
          </p>
          <span className="text-muted">{ t('chat.count', { count: messages.length }) }</span>
        </div>
        <MessageList messages={messages} />
        <MessageForm />
      </div>
    </div>
  );
};

export default Messages;
