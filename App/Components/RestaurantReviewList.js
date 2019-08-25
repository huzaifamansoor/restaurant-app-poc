import React, { Component } from 'react';
import styles from './Styles/RestaurantReviewListStyle';
import { withNavigation } from 'react-navigation';
import {View, FlatList  } from 'react-native';
import {
  Text
} from "native-base";
export class RestaurantReviewList extends Component {
  
  constructor(props){
    super(props);
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
    return (
      <View style={styles.container}>
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
    )
  }
}
export default withNavigation(RestaurantReviewList);