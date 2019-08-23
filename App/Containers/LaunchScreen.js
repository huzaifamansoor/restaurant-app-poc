import React, { Component } from 'react'
import {connect} from 'react-redux';
import ZomatoActions from '../Redux/ZomatoRedux'
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

class LaunchScreen extends Component {
  static navigationOptions = {
    title: 'Home'
  };

  constructor(props){
      super(props);
  }

  componentDidMount(){
    this.props.getRestaurantCollection(this.props.cityId);
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
            defaultCity : this.props.cityId
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
    this.props.getRestaurantCollection(text);
  }

  render() {
    var collectionList;
    if(this.props.isCollectionLoaded){
      collectionList = (
        <View >
          {
            this.props.collections.length > 0 ? (
              <FlatList
              data = {this.props.collections}
              renderItem = {({item}) => this.renderCategoryRow(item)}
              keyExtractor={(item, index) => index.toString()}
            />
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
    getRestaurantCollection: (cityId) => dispatch(ZomatoActions.getCollection(cityId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
