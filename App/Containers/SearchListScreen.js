import React, { Component } from 'react'
import {View, FlatList,Image,TouchableOpacity  } from 'react-native'
import { connect } from 'react-redux';

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

import ZomatoActions from '../Redux/ZomatoRedux';


class SearchListScreen extends Component {
  static navigationOptions = {
    title: 'Search Restaurant'
  };
  constructor(props){
    super(props);
  }
  componentWillMount(){
    const { navigation } = this.props;   
    this.props.setCollectionId(navigation.getParam('collectionId', '1'));
    this.props.setSearchKeyword('');
    this.props.searchWithoutParams();
  }

  onChangeKeyword(text){
    if(text.length > 2){
      this.props.setSearchKeyword(text);        
      this.props.searchWithParams(text);
      
    }
    else if(text.length === 0){
      this.props.setSearchKeyword('');
      this.props.searchWithoutParams();
    }
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
        
        <View style = {styles.imageView}>
          <Image source={{uri : bgImage}} style = {styles.resImage} resizeMethod='scale'/>
        </View>
        
        <View style ={styles.detailsView}>
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
    console.log(this.props)
    var searchList;
    if(this.props.searchResultLoaded){
      searchList = (
        <View >
            <FlatList
              data = {this.props.searchResult}
              renderItem = {({item}) => this.renderSearchResultRow(item)}
              ItemSeparatorComponent={this.renderSeparator}
              keyExtractor={(item, index) => index.toString()}
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
    collectionId : state.zomato.collectionId,
    searchResult : state.zomato.searchResult,
    searchResultLoaded : state.zomato.searchResultLoaded
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setCollectionId: (collectionId) => dispatch(ZomatoActions.setCollectionId(collectionId)),
    setSearchKeyword : (searchKeyword) =>  dispatch(ZomatoActions.setSearchKeyword(searchKeyword)),
    searchWithParams : (searchResult) => dispatch(ZomatoActions.searchWithParams(searchResult)),
    searchWithoutParams : () => dispatch(ZomatoActions.searchWithoutParams()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchListScreen)
