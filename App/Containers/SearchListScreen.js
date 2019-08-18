import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView,View, FlatList,Image,TouchableHighlight } from 'react-native'
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

class SearchListScreen extends Component {

  constructor(props){
    super(props);
    const { navigation } = this.props;

    this.state = {
      collectionId : navigation.getParam('collectionId', '1'),
      searchResult : [],
      searchkeyword : '',
      loaded: false
    }
  }

  componentWillMount(){    
    this.getSearchResult('');
  }

  getSearchResult(text){
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
    const bgImage = item.restaurant.featured_image;
    const resturantName = item.restaurant.name;
    const cost = item.restaurant.average_cost_for_two;
    const rating = item.restaurant.user_rating.aggregate_rating;

    console.log(bgImage + ' ' + resturantName + cost+' ' +cost +' ' +rating);
    return(
    <TouchableHighlight>
      <View>
      <View style ={{flex : 1, alignItems: 'center'}}>
        <Text>{resturantName}</Text>
      </View>
      <View style = {{flexDirection:'row'}}>
        <View style = {{flex : 1}}>
          <Image source={{uri : bgImage}} style = {{ width: 100, height: 100}} resizeMethod='scale'/>
        </View>
        
        <View style ={{flex:2}}>
          <Text>Rating: {rating}</Text>
          <Text>Cost: {cost}</Text>
        </View>
      </View>
      </View>
    </TouchableHighlight>
    );
  }

  onChangeText(text){

  }
  render () {
    
    var searchList;
    if(this.state.loaded){
      searchList = (
      <View>
          <Form>
          <Item rounded>
            <Input placeholder="Search" 
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
        <View >
          <Text>Retrieving ...</Text>
        </View>
      )
    }
    return (
      <Container style={Headerstyles.container}>
        <HeaderBar></HeaderBar>
         
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
