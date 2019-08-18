import { createStackNavigator, createAppContainer } from 'react-navigation'
import RestaurantdetailScreen from '../Containers/RestaurantdetailScreen'
import SearchListScreen from '../Containers/SearchListScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  RestaurantdetailScreen: { screen: RestaurantdetailScreen },
  SearchListScreen: { screen: SearchListScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  initialRouteName: 'LaunchScreen',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#255ca8',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
}})

export default createAppContainer(PrimaryNav)
