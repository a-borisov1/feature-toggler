import React from 'react';

import { Item } from '../item';

import { IListItem } from '../main';

import './style.scss';

interface IList {
  featuresList: IListItem[];
  setFeaturesList: (featuresList: IListItem[]) => void;
}

export const List: React.FC<IList> = ({ featuresList, setFeaturesList }) => {
  const handleDelete = (key: string) => {
    const afterDeletion = featuresList.filter((elem) => elem.key !== key);
    setFeaturesList(afterDeletion);
  };

  return (
    <div className="list">
      {featuresList.map((elem) => {
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
    </div>
  );
};
