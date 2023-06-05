import {
  Modal, Form, Button,
} from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useRollbar } from '@rollbar/react';

import { selectors } from '../../slices/channelsSlice.js';
import useChat from '../../hooks/useChat';

const Add = ({ onHide }) => {
  const [show, setShow] = useState(true);
  const channelsName = useSelector(selectors.selectAll).map(({ name }) => name);

  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { addChannel } = useChat();
  const rollbar = useRollbar();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup
      .string()
      .required(t('signup.required'))
      .min(3, t('signup.outOfLenght'))
      .max(20, t('signup.outOfLenght'))
      .notOneOf(channelsName, t('modal.uniq')),
  });

  const handleClose = () => {
    setShow(false);
    onHide();
  };

  const submitCb = () => {
    handleClose();
    toast.success(t('modal.created'));
  };

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    onSubmit: ({ name }) => {
      try {
        addChannel(leoProfanity.clean(name), submitCb);
      } catch (err) {
        rollbar.error(err);
        toast.error(t('errors.noConnection'));
      }
    },
  });

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.add')}</Modal.Title>
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
          <Form.Label className="visually-hidden" htmlFor="name">{t('modal.name')}</Form.Label>
          <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={handleClose}>
              {t('modal.cancel')}
            </Button>

            <Button type="submit" variant="primary">
              {t('modal.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
