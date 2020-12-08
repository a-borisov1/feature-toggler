import * as React from 'react';
import { shallow } from 'enzyme';
import Switch from '@material-ui/core/Switch';

import { Main } from './';
import { List } from '../list';

describe('Main component', () => { 
      it('Render child components', () => {
        const ShadowMain = shallow(<Main />);
        expect(ShadowMain.find(List)).toHaveLength(1)
        expect(ShadowMain.find('.main__input')).toHaveLength(1)
      });
})