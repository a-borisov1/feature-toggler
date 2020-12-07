import '@testing-library/jest-dom';
// import raf from 'tempPolyfills';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//import toJson from 'enzyme-to-json'
// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
(global as any).shallow = shallow;
(global as any).render = render;
(global as any).mount = mount;
//global.toJson = toJson
// Fail tests on any warning
console.error = (message: any) => {
  throw new Error(message);
};
