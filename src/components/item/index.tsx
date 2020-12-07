import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

import './style.scss';

interface IItem {
  activeByDefault: boolean;
  value: string;
  onDelete: (key: string) => void;
}

export const Item: React.FC<IItem> = ({ activeByDefault, value, onDelete }) => {
  const [active, setActive] = useState<boolean>(activeByDefault);
  const [currentValue, setCurrentValue] = useState<string>(value);

  return (
    <div className="item">
      <Switch
        checked={active}
        onChange={() => setActive(!active)}
        name="checkedB"
        color="primary"
      />
      <TextField
        className="item__text"
        value={currentValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCurrentValue(e.currentTarget.value)
        }
      />
      <div className="item__controls">
        <IconButton
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            setCurrentValue(e.currentTarget.value)
          }
        >
          <EditIcon color="primary" />
        </IconButton>
        <IconButton onClick={() => onDelete(value)}>
          <DeleteForeverIcon color="secondary" />
        </IconButton>
      </div>
    </div>
  );
};
