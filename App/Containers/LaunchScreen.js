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

import Modal from "react-native-modal";
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
  Text,
  Form,
  Label,
  Item,
  Picker
} from "native-base";
import {View, FlatList,Image,TouchableHighlight} from 'react-native';

//cityCodes
import {cityCode_NewYork, cityCode_NewJersey} from '../Helper/CityCodes';
import {collectionUrl, categoriesUrl} from '../Helper/URLs';
import {ZomatoAPIKey} from '../Helper/ApiKeys';

export default class LaunchScreen extends Component {
  
  constructor(props){
      super(props);

    this.state = {
      collections : [],
      loaded : false,      
      modalVisible : false,
      defaultCity: cityCode_NewYork
    }
  }

  componentDidMount(){
    this.getCollectionForCity();
  }

  getCollectionForCity(){
    axios.get(collectionUrl + this.state.defaultCity, {
      headers: {
        "user-key": ZomatoAPIKey
      }}).then(
        (res) => {
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

    return(
      <TouchableHighlight
        onPress={ () =>
          this.props.navigation.navigate('SearchListScreen',{collectionId : id})}
      >
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
      </TouchableHighlight>
    )

  }

  changeCity(text){
    this.setState({defaultCity:text});
    this.getCollectionForCity();
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
        <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your city"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue= {this.state.defaultCity}
                onValueChange={(text) => {
                  this.changeCity(text);
                }}
              >
                <Item label="New York" value={cityCode_NewYork} />
                <Item label="New Jersey" value={cityCode_NewJersey} />
              </Picker>
            </Item>
          </Form>
          {collectionList}
        </Content>
      </Container>
    );
  }
}
