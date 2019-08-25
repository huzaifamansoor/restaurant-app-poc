import 'react-native';
import React from 'react';

import LaunchScreen from '../../App/Containers/LaunchScreen';
import renderer from 'react-test-renderer';

test('LaunchScreen Snapshot' , () => {
    const snap = renderer.create(
        <LaunchScreen/>
    ).toJSON();

    expect(snap).toMatchSnapshot();    
});