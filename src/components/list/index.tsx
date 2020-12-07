import React from 'react';

import { Item } from '../item';

import './style.scss';

type IListItem = {
  key: string;
  active: boolean;
};

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
            activeByDefault={elem.active}
            value={elem.key}
            onDelete={handleDelete}
          />
        );
      })}
    </div>
  );
};
