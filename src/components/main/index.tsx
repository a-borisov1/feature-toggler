import React, { useState } from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import AddIcon from '@material-ui/icons/Add';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';

import { List } from '../list';

import { translations } from '../../locale/locale_picker';

import mockedData from '../../MockedData.json';

import './style.scss';

export type IListItem = {
  key: string;
  value: string;
  active: boolean;
  labels?: string[];
  createdAt?: number;
};

export const Main = () => {
  const initData = Object.values(mockedData).slice();

  const [newFeatureValue, setNewFeatureValue] = useState<string>('');
  const [featuresList, setFeaturesList] = useState<IListItem[]>(initData);
  const [open, setOpen] = useState<boolean>(false);

  const errorCondition = !!featuresList.find(
    (elem) => elem.value === newFeatureValue
  );

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleAdd = () => {
    const newArray = [
      ...featuresList,
      {
        key: uuidv4(),
        value: newFeatureValue,
        active: false,
        labels: ['New'],
        createdAt: moment().valueOf(),
      },
    ];
    setFeaturesList(newArray);
    setNewFeatureValue('');
    setOpen(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.charCode === 13 && newFeatureValue.length > 0 && !errorCondition)
      handleAdd();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFeatureValue(e.currentTarget.value.replace('  ', ' '));
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="main">
      <div className="main__input">
        <InputBase
          className="main__input__field"
          placeholder={translations['input here']}
          value={newFeatureValue}
          onChange={handleChange}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        {newFeatureValue.length > 0 && (
          <IconButton
            className="main__input__field__clear-button"
            onClick={() => setNewFeatureValue('')}
          >
            <Clear />
          </IconButton>
        )}
        <IconButton
          className="main__input__field__add-button"
          color="secondary"
          onClick={handleAdd}
          disabled={newFeatureValue.length < 1 || errorCondition}
        >
          <AddIcon />
        </IconButton>
      </div>
      <List featuresList={featuresList} setFeaturesList={setFeaturesList} />
      <Snackbar
        open={open}
        autoHideDuration={2600}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={'success'}>
          {translations['Successfully added!']}
        </Alert>
      </Snackbar>
    </div>
  );
};
