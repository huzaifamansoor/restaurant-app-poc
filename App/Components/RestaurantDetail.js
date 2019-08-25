import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import styles from './Styles/RestaurantDetailStyle'
import { ScrollView,View,Linking ,Image,TouchableOpacity  } from 'react-native';
import {
  Text
} from "native-base";
import { withNavigation } from 'react-navigation';

export class RestaurantDetail extends Component {
  
  constructor(props){
    super(props);
  }

  render () {
    return (
      <View style={styles.container}>
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
      </View>
    )
  }
}
export default withNavigation(RestaurantDetail);