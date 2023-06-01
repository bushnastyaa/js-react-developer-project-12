import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';

import useChat from '../../hooks/useChat';

function Remove({ onHide }) {
  const [show, setShow] = useState(true);
  const channelId = useSelector(({ modal }) => modal.channelId);
  const { removeChannel } = useChat();
  const { t } = useTranslation();

  const handleClose = () => {
    setShow(false);
    onHide();
  };

  const handleRemove = () => {
    removeChannel(channelId);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.remove')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('modal.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleClose}>
            {t('modal.cancel')}
          </Button>

          <Button type="submit" variant="danger" onClick={handleRemove}>
            {t('modal.delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
