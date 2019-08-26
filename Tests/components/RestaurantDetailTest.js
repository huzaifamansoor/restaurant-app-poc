import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { RestaurantDetail  } from '../../App/Components/RestaurantDetail';
import renderer from 'react-test-renderer';

const restaurantDetail= {    
    "id": "18881831",
    "name": "Laa Tandoori",
    "url": "https://www.zomato.com/saharanpur/laa-tandoori-subhash-nagar?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
    "location": {
      "address": "Near Sophia Girls college, Court Road Saharanpur UP, Subhash Nagar, Saharanpur",
    },
    "average_cost_for_two": 650,
    "price_range": 2,
    "user_rating": {
      "aggregate_rating": "4.3",
      },
      "photos_url": "https://www.zomato.com/saharanpur/laa-tandoori-subhash-nagar/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
      "photo_count": 3,
      "menu_url": "https://www.zomato.com/saharanpur/laa-tandoori-subhash-nagar/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
      "events_url": "https://www.zomato.com/saharanpur/laa-tandoori-subhash-nagar/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
      "phone_numbers": "+91 7500311313",  
  }


test('RestaurantDetail Snapshot' , () => {
    const snap = shallow(<RestaurantDetail restaurantDetail={restaurantDetail} />);

    expect(snap.debug()).toMatchSnapshot();   
});