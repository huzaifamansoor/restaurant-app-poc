import React, { Component } from 'react'
import styles from './Styles/SearchScreenListStyle'
import {View, FlatList,Image,TouchableOpacity  } from 'react-native'
import { withNavigation } from 'react-navigation';
import {
  Text
} from "native-base";

export class SearchScreenList extends Component {
  constructor(props){
    super(props);
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
    return (
      <View style={styles.container}>
        <FlatList
              data = {this.props.searchResult}
              renderItem = {({item}) => this.renderSearchResultRow(item)}
              ItemSeparatorComponent={this.renderSeparator}
              keyExtractor={(item, index) => index.toString()}
            />            
      </View>
    )
  }
}

export default withNavigation(SearchScreenList);