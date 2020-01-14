import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new EnzymeAdapter() });

import store from "../../store/reducer";
import {findByTestAttr} from '../../utils/testUtils';
import SearchBox from './SearchBox';

const setup =(initialState={})=>{
    const wrapper = shallow(<SearchBox store={store} />).dive().dive();

    // console.log(wrapper.debug());
    return wrapper;
};


describe('render', ()=>{
   let wrapper;

   beforeEach(()=>{
      const initialState = {};
      wrapper = setup(initialState);
    });

    test('renders button', ()=>{
        const button = findByTestAttr(wrapper, 'searchButton');
        expect(button.length).toBe(1);
    });

});

// describe('update state', ()=>{
//
// });
