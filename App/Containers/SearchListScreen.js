import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView,View, FlatList,Image,TouchableOpacity  } from 'react-native'
import { connect } from 'react-redux';
import axios from 'axios';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SearchListScreenStyle'

import HeaderBar from '../Components/HeaderBar';
import Headerstyles from '../Components/Styles/HeaderBarStyle';

import {
  Container,
  Header,
  Title,
  Content,
  Spinner,
  Button,
  Icon,
  Form,
  Item,
  Input,
  Left,
  Right,
  Body,
  Text
} from "native-base";

import {ZomatoAPIKey} from '../Helper/ApiKeys';
import {searchUrl} from '../Helper/URLs';
//cityCodes
import {cityCode_NewYork, cityCode_NewJersey} from '../Helper/CityCodes';

class SearchListScreen extends Component {
  static navigationOptions = {
    title: 'Search Restaurant',
    /* No more header config here! */
  };
  constructor(props){
    super(props);
    const { navigation } = this.props;

    this.state = {
      collectionId : navigation.getParam('collectionId', '1'),
      searchResult : [],
      searchkeyword : '',
      defaultCity : navigation.getParam('defaultCity', '1'),
      loaded: false
    }
  }

  componentWillMount(){    
    this.getSearchResult('');
  }

  getSearchResult(text){
    this.setState({loaded:false})
    var tempurl = '';

    if(text.length > 2){
      tempurl = `${searchUrl}${this.state.collectionId}&q=${text}`;
    }
    else
    {
      tempurl = `${searchUrl}${this.state.collectionId}`;
    }

    axios.get(tempurl, {
      headers: {
      "user-key": ZomatoAPIKey
    }}).then(
      (res) => {
        this.setState({searchResult: res.data.restaurants,
        loaded: true
        });
      }
    );
  }
  renderSearchResultRow(item){
    const resId = item.restaurant.id;
    const bgImage = item.restaurant.featured_image;
    const resturantName = item.restaurant.name;
    const cost = item.restaurant.average_cost_for_two;
    const rating = item.restaurant.user_rating.aggregate_rating;

    console.log(bgImage + ' ' + resturantName + cost+' ' +cost +' ' +rating);
    return(
    <TouchableOpacity 
      onPress={ () =>
        this.props.navigation.navigate('RestaurantdetailScreen',
        {
          resId : resId,
        })}
    >
      <View style = {{flexDirection:'row', padding: 15}}>
        
        <View style = {{flex : 1}}>
          <Image source={{uri : bgImage}} style = {{ borderRadius: 10,width: 100, height: 100}} resizeMethod='scale'/>
        </View>
        
        <View style ={{flex:2}}>
          <Text style={{fontSize: 18,fontWeight: 'bold'}}>{resturantName}</Text>
          <Text style={{fontSize: 14,fontWeight: 'bold'}}>Rating: {rating}</Text>
          <Text style={{fontSize: 14,fontWeight: 'bold'}}>Cost: {cost}</Text>
        </View>
      </View>
    </TouchableOpacity >
    );
  }

  changeCity(text){
    this.setState({defaultCity:text});
  }

  render () {
    
    var searchList;
    if(this.state.loaded){
      searchList = (
      <View>
          <Form style = {{ padding: 15}}>
          {/* <Item picker>
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
            </Item> */}

          <Item rounded>
            <Input placeholder="Search Restaurant" 
            onChangeText = {text => {
              this.getSearchResult(text);
            }}
            />
          </Item>
        </Form>

        <View >
            <FlatList
              data = {this.state.searchResult}
              renderItem = {({item}) => this.renderSearchResultRow(item)}
            />            
        </View>
      </View>     
       );
    }
    else{
      searchList = (
        <Spinner color="#255ca8" />
      )
    }
    return (
      <Container style={Headerstyles.container}>
        {/* <HeaderBar></HeaderBar> */}
         
        <Content padder>
        {searchList}
        </Content>
      </Container>

    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchListScreen)
