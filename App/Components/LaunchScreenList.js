import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import styles from './Styles/LaunchScreenListStyle'
import {
  Text
} from "native-base";
import {View, FlatList,Image,TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

export class LaunchScreenList extends Component {
  // // Prop type warnings
  constructor(props){
    super(props);
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

  render () {
    return (
      <FlatList
              data = {this.props.collections}
              renderItem = {({item}) => this.renderCategoryRow(item)}
              keyExtractor={(item, index) => index.toString()}
            />
    )
  }
}

export default withNavigation(LaunchScreenList);