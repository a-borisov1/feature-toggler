import React, { useState } from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddIcon from '@material-ui/icons/Add';

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
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const [featuresList, setFeaturesList] = useState<IListItem[]>(initData);
  const [featuresListWithFilter, setFeaturesListWithFilter] = useState<
    IListItem[]
  >(featuresList);

  const errorCondition =
    !!featuresList.find((elem) => elem.key === newFeatureValue) && !searchMode;

  const handleAdd = () => {
    const newArray = [
      ...featuresList,
      {
        key: uuidv4(),
        value: newFeatureValue,
        active: true,
        labels: ['New'],
        createdAt: moment().unix(),
      },
    ];
    setFeaturesList(newArray);
    setFeaturesListWithFilter(newArray);
    setNewFeatureValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.charCode === 13 && newFeatureValue.length > 0 && !errorCondition)
      handleAdd();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFeatureValue(e.currentTarget.value.replace('  ', ' '));
    if (searchMode) {
      setFeaturesListWithFilter(
        featuresList.filter((elem) =>
          elem.value.includes(e.currentTarget.value)
        )
      );
    }
  };

  return (
    <div className="main">
      <div className="main__input">
        <TextField
          id="standard-basic"
          label={
            errorCondition
              ? translations['this feature already exists']
              : translations['input here']
          }
          className="main__input__field"
          value={newFeatureValue}
          error={errorCondition}
          onChange={handleChange}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        {!searchMode && (
          <Fab
            size="small"
            color="secondary"
            aria-label="add"
            className="main__input__add_item"
            onClick={handleAdd}
            disabled={newFeatureValue.length < 1 || errorCondition}
          >
            <AddIcon />
          </Fab>
        )}
        <FormControlLabel
          className="main__input__mode"
          value={searchMode}
          control={<Switch color="primary" />}
          label={
            <p className="main__input__mode__text">
              {searchMode ? 'Search Mode' : 'Addition Mode'}
            </p>
          }
          labelPlacement="bottom"
          onChange={() => setSearchMode(!searchMode)}
        />
      </div>
      <List
        featuresList={searchMode ? featuresListWithFilter : featuresList}
        setFeaturesList={setFeaturesList}
      />
    </div>
  );
};
