import {
  Modal, Form, Button,
} from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import useChat from '../../hooks/useChat';

function Add({ onHide }) {
  const [show, setShow] = useState(true);
  const { channels, channelId } = useSelector((state) => ({
    channels: Object.values(state.channels.entities),
    channelId: state.modal.channelId,
  }));
  const channelsName = channels.map(({ name }) => name);
  const currentChannel = channels.find((channel) => channel.id === channelId);
  const { id, name } = currentChannel;

  const inputRef = useRef(null);
  const { addChannel } = useChat();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup
      .string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelsName, 'Имя должно быть уникальным'),
  });

  const handleClose = () => {
    setShow(false);
    onHide();
  };

  const formik = useFormik({
    initialValues: { name },
    validationSchema,
    onSubmit: ({ name: newName }) => {
      addChannel({ id, newName });
      handleClose();
    },
  });

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} autoComplete="off">
          <Form.Control 
            className="mb-2"
            type="text"
            name="name"
            id="name"
            ref={inputRef}
            value={formik.values.name}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting}
            isInvalid={(formik.touched.name && !!formik.errors.name)}
          />
          <Form.Label className="visually-hidden" htmlFor="name">Название канала</Form.Label>
          <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={handleClose}>
              Отменить
            </Button>

            <Button type="submit" variant="primary">
              Отправить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
