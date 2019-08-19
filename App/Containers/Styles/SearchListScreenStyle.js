import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  searchRow : {padding:20},
  flexRow : {flexDirection:'row'},
  mainView : {flex : 1},
  resImage : { borderRadius: 10,width: 100, height: 100},
  resName : {fontSize: 18,fontWeight: 'bold'},
  resRating : {fontSize: 14,fontWeight: 'bold'},
  resCost : {fontSize: 14,fontWeight: 'bold'},
  rowSeprator : {
    height: 1,
    width: "90%",
    marginLeft:15,
    backgroundColor: "#CED0CE",
  }
})
