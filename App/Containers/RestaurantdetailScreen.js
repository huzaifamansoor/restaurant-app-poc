import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Styles/RestaurantdetailScreenStyle';
import { ScrollView,View,Linking , FlatList,Image,TouchableOpacity  } from 'react-native';
import {
  Container,
  Content,
  Spinner,
  Text
} from "native-base";
import ZomatoActions from '../Redux/ZomatoRedux';

class RestaurantdetailScreen extends Component {
  static navigationOptions = {
    title: 'Resaurant Details'
  };

  constructor(props){
    super(props);
  }

  componentWillMount(){
    const { navigation } = this.props;
    const res_id = navigation.getParam('resId', '18881831');
    this.props.setRestaurantId(res_id);
    this.props.getRestaurantDetail(res_id);
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

    if(this.props.restaurantIsLoaded){
      detailView = (
        <ScrollView>
        <View>
         <View style = {styles.resNameView}>
            <Text style= {styles.resNametext}>{this.props.restaurantDetail.name}</Text>
          </View>

        <TouchableOpacity 
          onPress = {() => Linking.openURL(this.props.restaurantDetail.photos_url)}
        >
          <View  style = {styles.resimageView}>
            <Image source={{uri : this.props.restaurantDetail.thumb}} style = {styles.resimage}  resizeMethod='scale'/>
          </View>
        </TouchableOpacity >        

        <View style = {styles.resHeadingView}>
          <Text style = {styles.resHeading}>Address:</Text>
          <Text>{this.props.restaurantDetail.location.address}</Text>
        </View>

        <View style = {styles.resLinkView}>
          <Text style={styles.resLinkText}
            onPress={() => Linking.openURL(this.props.restaurantDetail.events_url)}>
              Other Link
          </Text>
        </View>

        <View style = {styles.resLinkView}>
          <Text style={styles.resLinkText}
            onPress={() => Linking.openURL(this.props.restaurantDetail.menu_url)}>
              Menu Link
          </Text>
        </View>

        <View style = {styles.resHeadingView}>
          <Text style = {styles.resHeading}>Reviews:</Text>
          <View>
            <FlatList
                data = {this.props.restaurantDetail.all_reviews.reviews}
                renderItem = {({item,index}) => this.renderReviewRow(item,index)}
                keyExtractor={(item, index) => index.toString()}
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
    restaurantId : state.zomato.restaurantId,
    restaurantDetail : state.zomato.restaurantDetail,
    restaurantIsLoaded: state.zomato.restaurantIsLoaded
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setRestaurantId: (restaurantId) => dispatch(ZomatoActions.setRestaurantId(restaurantId)),
    getRestaurantDetail : (restaurantId) => dispatch(ZomatoActions.getRestaurantDetail(restaurantId)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantdetailScreen)
