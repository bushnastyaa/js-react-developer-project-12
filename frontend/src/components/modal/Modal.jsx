import React from 'react';
import { useSelector } from 'react-redux';

import Add from './Add.jsx';
import Rename from './Rename.jsx';
import Remove from './Remove.jsx';

const ModalComponent = (props) => {
  const { type } = props;
  const modal = {
    addChannel: Add,
    renameChannel: Rename,
    removeChannel: Remove,
  };

  const Component = modal[type];

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Component {...props} />
  );
};

const Modal = (props) => {
  const type = useSelector(({ modal }) => modal.type);

  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      { type && <ModalComponent type={type} {...props} /> }
    </>
  );
};

export default Modal;
