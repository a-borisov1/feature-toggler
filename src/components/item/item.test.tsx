import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Switch from '@material-ui/core/Switch';

import { Item } from '.';
import { IconButton, TextField } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

describe('Item component', () => {
  const props = {
    _key: 'asgasgasgasg',
    activeByDefault: true,
    value: 'test',
    onDelete: () => '',
    labels: ['asd', 'zax', 'das'],
    createdAt: 1255125126162,
    featuresList: [
      {
        key: 'string',
        value: 'test',
        active: true,
        labels: ['asd', 'zax', 'das'],
        createdAt: 1255125126162,
      },
    ],
    setFeaturesList: () => {},
  };

  it('Render child components', () => {
    const ShadowItem = shallow(<Item {...props} />);
    expect(ShadowItem.find(IconButton)).toHaveLength(2);
    expect(ShadowItem.find(Switch)).toHaveLength(1);
    expect(ShadowItem.find('.item__text')).toHaveLength(1);
    expect(ShadowItem.find('.item__date')).toHaveLength(1);
    expect(ShadowItem.find('.item__labels__label')).toHaveLength(3);
    expect(ShadowItem.find('.item__controls')).toHaveLength(1);
  });

  it('should disable delete button on switch click', () => {
    const wrapper = shallow(<Item {...props} />);
    wrapper.find(Switch).simulate('click');
    expect(wrapper.find(DeleteForeverIcon).prop('color')).toEqual('disabled');
  });

  it('should get value as prop', () => {
    const wrapper = shallow(<Item {...props} />);
    expect(wrapper.find(TextField).prop('value')).toEqual('test');
  });

  it('should  delete  Item  on delete button click', () => {
    const wrapper = shallow(<Item {...props} />);
    wrapper.find(Switch).simulate('click');
    wrapper.find('.item__controls__button_delete').simulate('click');
    expect(wrapper.find('.item')).toEqual({});
  });
});
