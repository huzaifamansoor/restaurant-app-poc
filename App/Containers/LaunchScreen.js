import React, { Component } from 'react'
// import { ScrollView, Text, Image, View ,ImageBackground, FlatList} from 'react-native';
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'

import { Images } from '../Themes'
import axios from 'axios';
// Styles
import styles from './Styles/LaunchScreenStyles';
import Headerstyles from '../Components/Styles/HeaderBarStyle';

//import Component
import HeaderBar from '../Components/HeaderBar';

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text
} from "native-base";
import {View, FlatList,Image} from 'react-native';

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


//cityCodes
import {cityCode_NewYork, cityCode_NewJersey} from '../Helper/CityCodes';
import {collectionUrl, categoriesUrl} from '../Helper/URLs';
import {ZomatoAPIKey} from '../Helper/ApiKeys';

export default class LaunchScreen extends Component {
  
  constructor(props){
      super(props);

    this.state = {
      collections : [],
      loaded : false
    }
  }

  componentDidMount(){
    this.getCollectionForNewyork();
    console.log(this.state);
  }

  getCollectionForNewyork(){
    axios.get(collectionUrl + cityCode_NewYork, {
      headers: {
        "user-key": ZomatoAPIKey
      }}).then(
        (res) => {
          console.log(res.data.collections);
          this.setState({collections :res.data.collections})
          this.setState({loaded: true})
        }
      );
  }
  renderCategoryRow(item){

    // let bgImage = this.getBackGroundImage(item.categories.id);.collection.image_url
    let collectionTitle = item.collection.title;
    let id = item.collection.collection_id;
    let bgImage = item.collection.image_url;
    console.log(item)
    return(
      <View key= {id} style = {{flex: 1, padding: 10, alignItems: 'center'}}>
        <Image source={{uri : bgImage}} style = {{ width: '100%', height: 200}} blurRadius={2} opacity={8} resizeMethod='scale'/>

        <View style = {{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0, 
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 30, color: '#0f120b'}}>{collectionTitle}</Text>
        </View>
      </View>
          
    )

  }
  render() {
    var collectionList;
    if(this.state.loaded){
      collectionList = (
        <View >
            <FlatList
              data = {this.state.collections}
              renderItem = {({item}) => this.renderCategoryRow(item)}
            />
        </View>
      )
    }
    else{
      collectionList = (
        <View >
          <Text>Retrieving ...</Text>
        </View>
      )
    } 

    return (
      <Container style={Headerstyles.container}>
        <HeaderBar></HeaderBar>

        <Content padder>
          {collectionList}
        </Content>
      </Container>
    );
  }
}
