import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import leoProfanity from 'leo-profanity';

import useChat from '../../../hooks/useChat.jsx';

const MessageForm = () => {
  const { sendMessage } = useChat();
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const { username } = JSON.parse(localStorage.getItem('userInfo'));
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: ({ message }, { resetForm }) => {
      if (message !== '') {
        const filteredMessage = leoProfanity.clean(message);
        const data = { body: filteredMessage, channelId: currentChannelId, username };
        sendMessage(data);
        resetForm();
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [formik]);

  return (
    <div className="mt-auto px-5 py-3">
      <div>
        <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
          <InputGroup>
            <Form.Control
              className="border-0 p-0 ps-2"
              name="message"
              ref={inputRef}
              placeholder={t('chat.message')}
              aria-label={t('chat.newMessage')}
              value={formik.values.message}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
            />

            <Button
              type="submit"
              variant="link"
              className="btn-group-vertical text-dark"
              disabled={!formik.values.message.length > 0}
            >
              <ArrowRightSquare size={20} />
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default MessageForm;
