import React, { Component } from 'react'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/RestaurantdetailScreenStyle';
import { ScrollView, KeyboardAvoidingView,View,Linking , FlatList,Image,TouchableHighlight } from 'react-native'
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
import {detailUrl} from '../Helper/URLs';
import axios from 'axios';
import {ZomatoAPIKey} from '../Helper/ApiKeys';

class RestaurantdetailScreen extends Component {
  static navigationOptions = {
    title: 'Resaurant Details',
    /* No more header config here! */
  };

  constructor(props){
    super(props);

    const { navigation } = this.props;

    this.state = {
      resId : navigation.getParam('resId', '18881831'),
      loaded: false,
      resName: '',
      resAddress : '',
      resReviews : [],
      resMenu : '',
      resEventUrl : '',
      resImageUrl: '',
      resPhotosUrl: ''
    }
  }

  componentWillMount(){
    this.getRestaurantDetails();
  }

  getRestaurantDetails(){
    axios.get(detailUrl+this.state.resId, {
      headers: {
      "user-key": ZomatoAPIKey
    }}).then(
      (res) => {
        this.setState({resName: res.data.name});
        this.setState({resAddress: res.data.location.address});
        this.setState({resMenu: res.data.menu_url});
        this.setState({resReviews: res.data.all_reviews.reviews});
        this.setState({resEventUrl: res.data.events_url});
        this.setState({resImageUrl: res.data.thumb});
        this.setState({resPhotosUrl: res.data.photos_url});
        this.setState({loaded:true});
      });
  }

  renderReviewRow(item,index){
    return(
      <View style={{padding:15,justifyContent:"center"}}>
        <Text>
          <Text style= {{fontWeight:'bold'}}>{index+1}) </Text>
          <Text>
            {item.review.review_text}
          </Text>
        </Text>
        
      </View>
    );
  }
  

  render () {
    var detailView ;

    if(this.state.loaded){
      detailView = (
        <ScrollView>
      <View>
        <View style = {{justifyContent: "center", alignItems: "center", padding: 15}}>
          <Text style= {{fontWeight:'bold', fontSize:25}}>{this.state.resName}</Text>
        </View>

        <TouchableHighlight
          onPress = {() => Linking.openURL(this.state.resPhotosUrl)}
        >
          <View  style = {{ padding: 15, alignItems: 'center'}}>
            <Image source={{uri : this.state.resImageUrl}} style = {{ padding: 15,borderRadius: 10,width: '100%', height: 300}}  resizeMethod='scale'/>
          </View>
        </TouchableHighlight>
        

        <View style = {{padding: 15,marginTop:10}}>
          <Text style = {{fontWeight: 'bold', fontSize: 20}}>Address:</Text>
          <Text>{this.state.resAddress}</Text>
        </View>

        <View style = {{paddingLeft: 15}}>
          <Text style={{color: 'blue'}}
            onPress={() => Linking.openURL(this.state.resEventUrl)}>
              Other Link
          </Text>
        </View>

        <View style = {{paddingLeft: 15}}>
          <Text style={{color: 'blue'}}
            onPress={() => Linking.openURL(this.state.resMenu)}>
              Menu Link
          </Text>
        </View>

        <View style = {{padding: 15,marginTop:10}}>
          <Text style = {{fontWeight: 'bold', fontSize: 20}}>Reviews:</Text>
          <View>
            <FlatList
                data = {this.state.resReviews}
                renderItem = {({item,index}) => this.renderReviewRow(item,index)}
              />   
          </View>
        </View>        
      </View>        
      </ScrollView>
      );
    }

    else{
      detailView = (
        <View style = {{flex: 1, padding: 15, alignItems: 'center'}}>
          <Text >Retrieving ...</Text>
        </View>
      );
    }
    return (
      <Container style={Headerstyles.container}>
        {/* <HeaderBar></HeaderBar> */}

        <Content padder>
          {detailView}
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

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantdetailScreen)
