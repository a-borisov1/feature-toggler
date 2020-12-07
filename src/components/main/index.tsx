import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { List } from '../list';

import { translations } from '../../locale/locale_picker';

import mockedData from '../../MockedData.json';

import './style.scss';

type IListItem = {
  key: string;
  active: boolean;
};

export const Main = () => {
  const [newFeatureValue, setNewFeatureValue] = useState<string>('');
  const [featuresList, setFeaturesList] = useState<IListItem[]>(
    Object.values(mockedData).slice()
  );

  const handleAdd = () => {
    const newArray = [...featuresList, { key: newFeatureValue, active: true }];
    setFeaturesList(newArray);
    setNewFeatureValue('');
  };
  return (
    <div className="main">
      <div className="main__input">
        <TextField
          id="standard-basic"
          label={translations['input here']}
          className="main__input__field"
          value={newFeatureValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewFeatureValue(e.currentTarget.value)
          }
        />
        <Fab
          size="small"
          color="secondary"
          aria-label="add"
          className="main__input__add_item"
          onClick={handleAdd}
        >
          <AddIcon />
        </Fab>
      </div>
      <List featuresList={featuresList} setFeaturesList={setFeaturesList} />
    </div>
  );
};
