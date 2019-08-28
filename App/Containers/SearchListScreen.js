import React, { Component } from 'react'
import {View } from 'react-native'
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

//import Components
import SearchScreenList from '../Components/SearchScreenList';

export class SearchListScreen extends Component {
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
    this.props.searchWithoutParams(this.props.collectionId);
  }

  onChangeKeyword(searchKeyword){
    if(searchKeyword.length > 2){
      this.props.setSearchKeyword(searchKeyword);        
      this.props.searchWithParams(this.props.collectionId,searchKeyword);
      
    }
    else if(searchKeyword.length === 0){
      this.props.setSearchKeyword('');
      this.props.searchWithoutParams(this.props.collectionId);
    }
  }

  render () { 
    var searchList;
    if(this.props.searchResultLoaded){
      searchList = (
        <View >
          {
            this.props.searchResult.length > 0 ? (
            <SearchScreenList searchResult ={this.props.searchResult}/> 
            ):(
              <View style = {styles.noRecordFound}>
                <Text>No record found</Text>
              </View>
            )
          }                   
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
    searchWithParams : (collectionId,searchKeyword) => dispatch(ZomatoActions.searchWithParams(collectionId,searchKeyword)),
    searchWithoutParams : (collectionId) => dispatch(ZomatoActions.searchWithoutParams(collectionId)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchListScreen)
