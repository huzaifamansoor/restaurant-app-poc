import React, { Component } from 'react';
import { connect } from 'react-redux';
// import styles from './Styles/RestaurantdetailScreenStyle';
import { ScrollView,View } from 'react-native';
import {
  Container,
  Content,
  Spinner,
  Text
} from "native-base";
import ZomatoActions from '../Redux/ZomatoRedux';
import RestaurantDetail from '../Components/RestaurantDetail';
import RestaurantReviewList from '../Components/RestaurantReviewList';

export class RestaurantdetailScreen extends Component {
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
  render () {
    var detailView ;

    if(this.props.restaurantIsLoaded){
      detailView = (
        <ScrollView>
          <View>
            <RestaurantDetail restaurantDetail = {this.props.restaurantDetail}/>
            <RestaurantReviewList restaurantDetail = {this.props.restaurantDetail}/>              
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
