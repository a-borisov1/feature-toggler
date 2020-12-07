import React from 'react';
import { shallow } from 'enzyme';
import { Item } from './';

describe('Item spec', () => {
  const props = {
    activeByDefault: true,
    value: '',
    onDelete: (key: string) => {},
  };

  // здесь будут будущие it
  describe('News container initial', () => {
    // группируем еще на один уровень, так как здесь потом будет тест componentDidMount
    // const newsContainer = shallow(<Item {...props} />);
    it('render initial', () => {
      //   expect(newsContainer.find('p')).toHaveLength(0); // .find + поиск по тэгу
      //   expect(newsContainer.find('NewsList')).toHaveLength(0); // .find + поиск по имени компонента
    });
  });
});
