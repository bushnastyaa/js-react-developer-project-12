import React from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';

import { actions } from '../../../slices/channelsSlice.js';

function Channel({
  handleRemove, handleRename, channelData, currentChannelId,
}) {
  const dispatch = useDispatch();
  const { id, name, removable } = channelData;
  const isActive = id === currentChannelId;
  const variant = isActive ? 'secondary' : 'light';

  const handleSelect = (currentId) => () => {
    dispatch(actions.setCurrentChannel(currentId));
  };

  return (
    <li className="nav-item w-100 my-1">
      {removable ? (
        <Dropdown as={ButtonGroup} className="w-100">
          <Button variant={variant} className="text-start w-100 text-truncate" onClick={handleSelect(id)}>
            <span className="text-bg-primary rounded px-1 me-1 fw-light small">#</span>
            {name}
          </Button>

          <Dropdown.Toggle split variant={variant} className="flex-grow-0 text-end">
            <span className="visually-hidden">Управление каналом</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleRemove(id)}>Удалить</Dropdown.Item>
            <Dropdown.Item onClick={handleRename(id)}>Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button variant={variant} className="text-start w-100 text-truncate" onClick={handleSelect(id)}>
          <span className="text-bg-primary rounded me-1 fw-light px-1 small">#</span>
          {name}
        </Button>
      )}
    </li>
  );
};

export default Channel;
