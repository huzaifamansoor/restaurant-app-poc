import React, { Component } from 'react'
import {View, FlatList,Image,TouchableOpacity  } from 'react-native'
import { connect } from 'react-redux';
import axios from 'axios';

import styles from './Styles/SearchListScreenStyle';
import {
  Container,
  Content,
  Spinner,
  Form,
  Item,
  Input,
  Text
} from "native-base";

import {ZomatoAPIKey} from '../Helper/ApiKeys';
import {searchUrl} from '../Helper/URLs';

class SearchListScreen extends Component {
  static navigationOptions = {
    title: 'Search Restaurant'
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
    this.getSearchResult(`${searchUrl}${this.state.collectionId}`);
  }

  onChangeKeyword(text){
    var tempurl = '';
    if(text.length > 2){
    this.setState({loaded:false})
      tempurl = `${searchUrl}${this.state.collectionId}&q=${text}`;
      this.getSearchResult(tempurl);
    }
    else if(text.length === 0){
      this.setState({loaded:false})
        tempurl = `${searchUrl}${this.state.collectionId}`;
        this.getSearchResult(tempurl);
      }
  }

  getSearchResult(tempurl){
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

    return(
    <TouchableOpacity 
      style = {styles.searchRow}
      onPress={ () =>
        this.props.navigation.navigate('RestaurantdetailScreen',
        {
          resId : resId,
        })}
    >
      <View style = {styles.flexRow}>
        
        <View style = {styles.mainView}>
          <Image source={{uri : bgImage}} style = {styles.resImage} resizeMethod='scale'/>
        </View>
        
        <View style ={{flex:2}}>
          <Text style={styles.resName}>{resturantName}</Text>
          <Text style={styles.resRating}>Rating: {rating}</Text>
          <Text style={styles.resCost}>Cost: {cost}</Text>
        </View>
      </View>
    </TouchableOpacity >
    );
  }

  renderSeparator = () => {
    return (
      <View
        style={styles.rowSeprator}
      />
    );
  };

  render () {    
    var searchList;
    if(this.state.loaded){
      searchList = (
        <View >
            <FlatList
              data = {this.state.searchResult}
              renderItem = {({item}) => this.renderSearchResultRow(item)}
              ItemSeparatorComponent={this.renderSeparator}
            />            
        </View>
       );
    }
    else{
      searchList = (
        <Spinner color="#255ca8" />
      )
    }
    return (
      <Container>         
        <Content padder>
        <Form style = {{ padding: 15}}>
          <Item rounded>
            <Input placeholder="Search Restaurant" 
            onChangeText = {text => {
              this.onChangeKeyword(text);
            }}
            />
          </Item>
        </Form>
        {searchList}
        </Content>
      </Container>
    );
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
