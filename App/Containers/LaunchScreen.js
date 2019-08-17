import React, { Component } from 'react'
import { ScrollView, Text, Image, View ,ImageBackground, FlatList} from 'react-native';
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'

import { Images } from '../Themes'
import axios from 'axios';
// Styles
import styles from './Styles/LaunchScreenStyles'
import DeviceInfoScreen from '../../ignite/DevScreens/DeviceInfoScreen.js';

const Breakfast = require('.././Images/categories/Breakfast.jpg');
const Cafes = require('.././Images/categories/Cafes.jpg');
const Catching_up = require('.././Images/categories/Catching_up.jpg');
const Clubs_and_Lounges = require('.././Images/categories/Clubs_&_Lounges.jpg');
const Daily_Menus = require('.././Images/categories/Daily_Menus.jpg');
const Delivery = require('.././Images/categories/Delivery.jpg');
const Dine_out = require('.././Images/categories/Dine_out.jpg');
const Lunch = require('.././Images/categories/Lunch.jpeg');
const Nightlife = require('.././Images/categories/Nightlife.jpeg');
const Pocket_Friendly_Delivery = require('.././Images/categories/Pocket_Friendly_Delivery.jpg');
const Pubs_and_Bars = require('.././Images/categories/Pubs_&_Bars.jpg');
const Takeaway = require('.././Images/categories/Takeaway.jpg');
const Dinner = require('.././Images/categories/Dinner.jpg');


export default class LaunchScreen extends Component {
  
  constructor(props){
      super(props);

    this.state = {
      categories : [],
      loaded : false
    }
  }
  
  getCategory(){
    axios.get('https://developers.zomato.com/api/v2.1/categories', {
      headers: {
        "user-key": "b5ac3100e25f801221a8795de6fde1a3"
      }}).then(
        (res) => {
          this.setState({categories : res.data.categories, loaded: true});
          console.log(this.state)
        }
      );
  }

  componentDidMount(){
    this.getCategory();
    console.log(this.state);
  }

  getBackGroundImage(id){
    switch(id){
      case 1:
        return Delivery;
      case 2:
        return Dine_out;
      case 3:
        return Nightlife;
      case 4:
        return Catching_up;
      case 5:
        return Takeaway;
      case 6:
        return Cafes;
      case 7:
        return Daily_Menus;
      case 8:
        return Breakfast;
      case 9:
        return Lunch;
      case 10:
        return Dinner;
      case 11:
        return Pubs_and_Bars;
      case 13:
        return Pocket_Friendly_Delivery;
      case 14:
        Clubs_and_Lounges;
      default:
        return Dinner;
    }
  }
  renderCategoryRow(item){

    let bgImage = this.getBackGroundImage(item.categories.id);
    console.log(item)
    return(
      <View style = {{flex: 1, padding: 10, alignItems: 'center'}}>
        <Image key={item.id} source={bgImage} style = {{ height: 200}} opacity={0.85} resizeMethod={"scale"}/>

        <View style = {{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0, 
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 30, color: '#0f120b'}}>{item.categories.name}</Text>
        </View>
      </View>
          
    )


  }

  render () {
    if(this.state.loaded){
      return (
        <View >
            <FlatList
              data = {this.state.categories}
              renderItem = {({item}) => this.renderCategoryRow(item)}
            />
        </View>
      )
    }
    else{
      return(
        <View >
          <Text>Retrieving ...</Text>
        </View>
      )
    } 
  }
}
