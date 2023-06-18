import React from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { actions } from '../../../slices/channelsSlice.js';

const Channel = ({
  handleRemove, handleRename, channelData, currentChannelId,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id, name, removable } = channelData;
  const isActive = id === currentChannelId;
  const variant = isActive ? 'secondary' : 'light';

  const handleSelect = (currentId) => () => {
    dispatch(actions.setCurrentChannel(currentId));
  };

  return (
    <li className="nav-item w-100">
      {removable ? (
        <Dropdown as={ButtonGroup} className="w-100">
          <Button variant={variant} className="text-start w-100 text-truncate" onClick={handleSelect(id)}>
            <span className="me-1">#</span>
            {name}
          </Button>

          <Dropdown.Toggle split variant={variant} className="border-0">
            <span className="visually-hidden">{t('chat.manage')}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleRemove(id)}>{t('chat.remove')}</Dropdown.Item>
            <Dropdown.Item onClick={handleRename(id)}>{t('chat.rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button variant={variant} className="w-100 rounded-0 text-start" onClick={handleSelect(id)}>
          <span className="me-1">#</span>
          {name}
        </Button>
      )}
    </li>
  );
};

export default Channel;
