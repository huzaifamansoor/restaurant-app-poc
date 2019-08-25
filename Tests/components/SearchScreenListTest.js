import 'react-native';
import React from 'react';

import { SearchScreenList  } from '../../App/Components/SearchScreenList';
import renderer from 'react-test-renderer';

test('SearchScreenList Snapshot' , () => {
    const snap = renderer.create(
        <SearchScreenList/>
    ).toJSON();

    expect(snap).toMatchSnapshot();    
});