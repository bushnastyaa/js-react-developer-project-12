import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useRollbar } from '@rollbar/react';
import useChat from '../../../hooks/useChat';

const MessageForm = () => {
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);
  const { sendMessage } = useChat();
  const inputRef = useRef(null);
  const rollbar = useRollbar();
  const { username } = JSON.parse(localStorage.getItem('userInfo'));
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: ({ message }) => {
      try {
        const filteredMessage = leoProfanity.clean(message);
        const data = { body: filteredMessage, channelId: currentChannelId, username };
        sendMessage(data);
        formik.resetForm();
      } catch (err) {
        toast.error(t('errors.noConnection'));
        rollbar.error(err);
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [formik.isSubmitting, currentChannelId]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <InputGroup>
          <Form.Control
            type="text"
            name="messsage"
            placeholder={t('chat.message')}
            aria-label={t('chat.newMessage')}
            className="border-0 p-0 ps-2 form-control"
            ref={inputRef}
            value={formik.values.message}
            disabled={formik.isSubmitting}
            onChange={formik.handleChange}
          />
          <Button
            type="submit"
            variant="link"
            className="btn-group-vertical text-dark"
            disabled={formik.values.message.length < 0}
          >
            <ArrowRightSquare size="20" />
            <span className="visually-hidden">{t('modal.send')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageForm;
