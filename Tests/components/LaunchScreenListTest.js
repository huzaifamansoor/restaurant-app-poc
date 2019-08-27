import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { LaunchScreenList  } from '../../App/Components/LaunchScreenList';


const collections = [
    {
      "collection": {
        "collection_id": 1,
        "res_count": 30,
        "image_url": "https://b.zmtcdn.com/data/collections/b53772a204429cb9b42313d6dc22bf3c_1556018415.jpg",
        "url": "https://www.zomato.com/bhuj/top-restaurants?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
        "title": "Trending This Week",
        "description": "Most popular restaurants in town this week",
        "share_url": "http://www.zoma.to/c-280/1"
      }
    },
    {
        "collection": {
          "collection_id": 2,
          "res_count": 30,
          "image_url": "https://b.zmtcdn.com/data/collections/b53772a204429cb9b42313d6dc22bf3c_1556018415.jpg",
          "url": "https://www.zomato.com/bhuj/top-restaurants?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
          "title": "Trending This Week",
          "description": "Most popular restaurants in town this week",
          "share_url": "http://www.zoma.to/c-280/1"
        }
    },
    {
        "collection": {
          "collection_id": 3,
          "res_count": 30,
          "image_url": "https://b.zmtcdn.com/data/collections/b53772a204429cb9b42313d6dc22bf3c_1556018415.jpg",
          "url": "https://www.zomato.com/bhuj/top-restaurants?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
          "title": "Trending This Week",
          "description": "Most popular restaurants in town this week",
          "share_url": "http://www.zoma.to/c-280/1"
        }
    },

    {
        "collection": {
          "collection_id": 3,
          "res_count": 30,
          "image_url": "https://b.zmtcdn.com/data/collections/b53772a204429cb9b42313d6dc22bf3c_1556018415.jpg",
          "url": "https://www.zomato.com/bhuj/top-restaurants?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
          "title": "Trending This Week",
          "description": "Most popular restaurants in town this week",
          "share_url": "http://www.zoma.to/c-280/1"
        }
    }
]
test('LaunchScreenList Snapshot' , () => {
    const snap = shallow(<LaunchScreenList collections={collections} />);

    expect(snap.debug()).toMatchSnapshot();    
});