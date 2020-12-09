import React, { useState, useEffect } from 'react';

import { Item } from '../item';

import Search from '@material-ui/icons/Search';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';

import { IListItem } from '../main';

import { translations } from '../../locale/locale_picker';

import './style.scss';

interface IList {
  featuresList: IListItem[];
  setFeaturesList: (featuresList: IListItem[]) => void;
}

export const List: React.FC<IList> = ({ featuresList, setFeaturesList }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [filteredFeatures, setFilteredFeatures] = useState<IListItem[]>(
    featuresList
  );

  useEffect(() => {
    setFilteredFeatures(
      featuresList
        .slice()
        .filter((feature) =>
          feature.value
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase())
        )
    );
  }, [featuresList, searchValue]);

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleDelete = (key: string) => {
    const afterDeletion = featuresList.filter((elem) => elem.key !== key);
    setFeaturesList(afterDeletion);
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
    setFilteredFeatures(
      featuresList
        .slice()
        .filter((feature) =>
          feature.value
            .toLocaleLowerCase()
            .includes(e.currentTarget.value.toLocaleLowerCase())
        )
    );
  };

  return (
    <div className="list">
      <IconButton aria-label="menu" disabled>
        <Search />
      </IconButton>
      <InputBase
        placeholder={translations.Search}
        value={searchValue}
        onChange={handleChange}
      />
      {searchValue.length > 0 && (
        <IconButton aria-label="menu" onClick={() => setSearchValue('')}>
          <Clear />
        </IconButton>
      )}
      {filteredFeatures.map((elem) => {
        return (
          <Item
            key={elem.key}
            _key={elem.key}
            activeByDefault={elem.active}
            value={elem.value}
            onDelete={handleDelete}
            labels={elem?.labels}
            createdAt={elem?.createdAt}
            featuresList={featuresList}
            setFeaturesList={setFeaturesList}
          />
        );
      })}
      <Snackbar
        open={open}
        autoHideDuration={2600}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={'success'}>
          {translations['Successfully deleted!']}
        </Alert>
      </Snackbar>
    </div>
  );
};
