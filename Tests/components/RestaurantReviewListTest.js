import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { RestaurantReviewList  } from '../../App/Components/RestaurantReviewList';

const restaurantDetail = {
    all_reviews : {
        reviews : [
            {
                review : {
                    review_text : 'Test 1'
                }                
            },
            {
                review : {
                    review_text : 'Test 2'
                }                
            },
            {
                review : {
                    review_text : 'Test 3'
                }                
            },
        ]
    }
}

test('RestaurantReviewList Snapshot' , () => {

    const snap = shallow(<RestaurantReviewList restaurantDetail={restaurantDetail} />);

    expect(snap).toMatchSnapshot();    
});