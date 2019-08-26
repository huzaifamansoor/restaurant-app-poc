import 'react-native';
import React from 'react';

import { LaunchScreenList  } from '../../App/Components/LaunchScreenList';
import renderer from 'react-test-renderer';

test('LaunchScreenList Snapshot' , () => {
    const snap = renderer.create(
        <LaunchScreenList/>
    ).toJSON();

    expect(snap).toMatchSnapshot();    
});