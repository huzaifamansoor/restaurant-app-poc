import 'react-native';
import React from 'react';

import SearchListScreen from '../../App/Containers/SearchListScreen';
import renderer from 'react-test-renderer';

test('SearchListScreen Snapshot' , () => {
    const snap = renderer.create(
        <SearchListScreen/>
    ).toJSON();

    expect(snap).toMatchSnapshot();    
});