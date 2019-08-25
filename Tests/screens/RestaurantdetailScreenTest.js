import 'react-native';
import React from 'react';

import RestaurantdetailScreen from '../../App/Containers/RestaurantdetailScreen';
import renderer from 'react-test-renderer';

test('RestaurantdetailScreen Snapshot' , () => {
    const snap = renderer.create(
        <RestaurantdetailScreen/>
    ).toJSON();

    expect(snap).toMatchSnapshot();    
});