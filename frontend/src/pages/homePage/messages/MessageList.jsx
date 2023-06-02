import React, { useEffect, useRef } from 'react';

const MessageList = ({ messages }) => {
  const messageRef = useRef(null);
  const lastmessage = messages[messages.length - 1];

  useEffect(() => {
    if (lastmessage) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages.map(({ id, username, body }) => (
        <div key={id} className="text-break mb-2" ref={messageRef}>
          <b>{username}</b>
          :
          {' '}
          {body}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
