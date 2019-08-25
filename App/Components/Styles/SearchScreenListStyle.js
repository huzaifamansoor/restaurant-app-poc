import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  searchRow : {padding:20},
  flexRow : {flexDirection:'row'},
  imageView : {flex : 1},
  resImage : { borderRadius: 10,width: 100, height: 100},
  resName : {fontSize: 18,fontWeight: 'bold'},
  resRating : {fontSize: 14,fontWeight: 'bold'},
  resCost : {fontSize: 14,fontWeight: 'bold'},
  rowSeprator : {
    height: 1,
    width: "90%",
    marginLeft:15,
    backgroundColor: "#CED0CE",
  },
  detailsView : {flex: 2, paddingLeft: 10},
})
