import React, { useState } from 'react';
import moment from 'moment';

import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { translations } from '../../locale/locale_picker';

import { IListItem } from '../main';

import './style.scss';

interface IItem {
  activeByDefault: boolean;
  _key: string;
  value: string;
  onDelete: (key: string) => void;
  labels?: string[];
  createdAt?: number;
  featuresList: IListItem[];
  setFeaturesList: (featuresList: IListItem[]) => void;
}

export const Item: React.FC<IItem> = ({
  activeByDefault,
  value,
  _key,
  onDelete,
  labels,
  createdAt,
  featuresList,
  setFeaturesList,
}) => {
  const [active, setActive] = useState<boolean>(activeByDefault);
  const [currentValue, setCurrentValue] = useState<string>(value);
  const [open, setOpen] = useState<boolean>(false);

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value === '') {
      onDelete(_key);
    }
  };

  const handleDelete = () => {
    if (active) {
      setOpen(true);
    } else {
      onDelete(_key);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrentValue(e.currentTarget.value);
    const changedFeaturesList = featuresList.map((elem) =>
      elem.key === _key ? { ...elem, value: e.currentTarget.value } : elem
    );
    setFeaturesList(changedFeaturesList);
  };

  return (
    <div className={`item ${active ? 'active' : ''}`}>
      <Switch
        checked={active}
        onChange={() => setActive(!active)}
        name="checkedB"
        color="primary"
      />
      <div className="item__info">
        <TextField
          className="item__text"
          value={currentValue}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleBlur(e)}
        />
        <p className="item__date">
          {translations['Created at']}
          {moment(createdAt ?? '').format('DD.MM.YY')}
        </p>
      </div>

      <div className="item__labels">
        {labels?.map((elem) => {
          return (
            <div className="item__labels__label" key={elem}>
              {elem}
            </div>
          );
        })}
      </div>
      <div className="item__controls">
        <IconButton
          className="item__controls__button_delete"
          onClick={handleDelete}
        >
          <DeleteForeverIcon color={active ? 'disabled' : 'secondary'} />
        </IconButton>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={2600}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={'error'}>
          {translations['Set this feature inactive first!']}
        </Alert>
      </Snackbar>
    </div>
  );
};
