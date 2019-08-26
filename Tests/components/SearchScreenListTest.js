import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { SearchScreenList  } from '../../App/Components/SearchScreenList';
import renderer from 'react-test-renderer';


const searchResult  = [
    {
        restaurant : {
            name: "Test Restaurant 1",
            id: "18699322",
            featured_image: "https://b.zmtcdn.com/data/pictures/7/18742897/4076ef7f4b04fd9ffae1162ff055087e.jpg?output-format=webp",
            average_cost_for_two: 1000,
            user_rating: {
                "aggregate_rating": "4.1"
            }
        }
    },

    {
        restaurant : {
            name: "Test Restaurant 2",
            id: "18699322",
            featured_image: "https://b.zmtcdn.com/data/pictures/7/18742897/4076ef7f4b04fd9ffae1162ff055087e.jpg?output-format=webp",
            average_cost_for_two: 1000,
            user_rating: {
                "aggregate_rating": "4.1"
            }
        }
    },

    {
        restaurant : {
            name: "Test Restaurant 3",
            id: "18699322",
            featured_image: "https://b.zmtcdn.com/data/pictures/7/18742897/4076ef7f4b04fd9ffae1162ff055087e.jpg?output-format=webp",
            average_cost_for_two: 1000,
            user_rating: {
                "aggregate_rating": "4.1"
            }
        }
    }
]
test('SearchScreenList Snapshot' , () => {
    const snap = shallow(<SearchScreenList searchResult={searchResult} />);

    expect(snap).toMatchSnapshot();    
});