import React, { Component } from 'react'
import {connect} from 'react-redux';
import ZomatoActions from '../Redux/ZomatoRedux'
// Styles
// import styles from './Styles/LaunchScreenStyles';
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
import {View } from 'react-native';

//cityCodes
import {cityCode_NewYork, cityCode_NewJersey} from '../Helper/CityCodes';

//import Components
import LaunchScreenList from '../Components/LaunchScreenList';

export class LaunchScreen extends Component {
  static navigationOptions = {
    title: 'Home'
  };

  constructor(props){
      super(props);
  }

  componentDidMount(){
    this.props.getRestaurantCollection(this.props.cityId);
  }

  changeCity(cityId){
    this.props.setCityId(cityId);
    this.props.getRestaurantCollection(cityId);
  }

  render() {
    var collectionList;
    if(this.props.isCollectionLoaded){
      collectionList = (
        <View >
          {
            this.props.collections.length > 0 ? (
            <LaunchScreenList collections = {this.props.collections}/>
            ):(
              <View>
                <Text>No data Found</Text>
              </View>
            )
          }
                        
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
                selectedValue= {this.props.cityId}
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

const mapStateToProps = (state) => {
  return {
    data: state.zomato,
    collections : state.zomato.collections,
    isCollectionLoaded : state.zomato.collectionIsLoaded,
    cityId : state.zomato.cityId
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getRestaurantCollection: (cityId) => dispatch(ZomatoActions.getCollection(cityId)),
    setCityId: (cityId) => dispatch(ZomatoActions.setCityId(cityId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
