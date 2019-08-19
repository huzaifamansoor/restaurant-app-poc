import React, { Component } from 'react'

import axios from 'axios';
// Styles
import styles from './Styles/LaunchScreenStyles';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Text,
  Form,
  Item,
  Picker
} from "native-base";
import {View, FlatList,Image,TouchableOpacity } from 'react-native';

//cityCodes
import {cityCode_NewYork, cityCode_NewJersey} from '../Helper/CityCodes';
import {collectionUrl, categoriesUrl} from '../Helper/URLs';
import {ZomatoAPIKey} from '../Helper/ApiKeys';

export default class LaunchScreen extends Component {
  static navigationOptions = {
    title: 'Home'
  };

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
    let collectionTitle = item.collection.title;
    let id = item.collection.collection_id;
    let bgImage = item.collection.image_url;

    return(
      <TouchableOpacity 
        onPress={ () =>
          this.props.navigation.navigate('SearchListScreen',
          {
            collectionId : id,
            defaultCity : this.state.defaultCity
          })}
      >
      <View key= {id} style = {styles.renderContainer}>
        <Image source={{uri : bgImage}} style = {styles.bgimage} blurRadius={2.5} opacity={7} resizeMethod='scale'/>

        <View style = {styles.absoluteView}>
        <Text style={styles.bgText}>{collectionTitle}</Text>
        </View>
      </View>
      </TouchableOpacity >
    )
  }

  changeCity(text){
    this.setState({defaultCity:text});
    this.setState({loaded: false})
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
          <Spinner color="#255ca8" />
      )
    }

    return (
      <Container>
        <Content padder>
        <Form style={{ padding: 15}}>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down" />}
                style={{ width: undefined}}
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
