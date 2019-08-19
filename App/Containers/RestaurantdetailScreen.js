import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Styles/RestaurantdetailScreenStyle';
import { ScrollView,View,Linking , FlatList,Image,TouchableOpacity  } from 'react-native'
import Headerstyles from '../Components/Styles/HeaderBarStyle';
import {
  Container,
  Content,
  Spinner,
  Text
} from "native-base";
import {detailUrl} from '../Helper/URLs';
import axios from 'axios';
import {ZomatoAPIKey} from '../Helper/ApiKeys';

class RestaurantdetailScreen extends Component {
  static navigationOptions = {
    title: 'Resaurant Details'
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
      <View style={styles.reviewRow}>
        <Text>
          <Text style= {styles.reviewIndex}>{index+1}) </Text>
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
         <View style = {styles.resNameView}>
            <Text style= {styles.resNametext}>{this.state.resName}</Text>
          </View>

        <TouchableOpacity 
          onPress = {() => Linking.openURL(this.state.resPhotosUrl)}
        >
          <View  style = {styles.resimageView}>
            <Image source={{uri : this.state.resImageUrl}} style = {styles.resimage}  resizeMethod='scale'/>
          </View>
        </TouchableOpacity >        

        <View style = {styles.resHeadingView}>
          <Text style = {styles.resHeading}>Address:</Text>
          <Text>{this.state.resAddress}</Text>
        </View>

        <View style = {styles.resLinkView}>
          <Text style={styles.resLinkText}
            onPress={() => Linking.openURL(this.state.resEventUrl)}>
              Other Link
          </Text>
        </View>

        <View style = {styles.resLinkView}>
          <Text style={styles.resLinkText}
            onPress={() => Linking.openURL(this.state.resMenu)}>
              Menu Link
          </Text>
        </View>

        <View style = {styles.resHeadingView}>
          <Text style = {styles.resHeading}>Reviews:</Text>
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
        <Spinner color="#255ca8" />
      );
    }
    return (
      <Container>
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
