import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  reviewRow : {padding:15,justifyContent:"center"},
  reviewIndex :{fontWeight:'bold'},
  resNameView : {justifyContent: "center", alignItems: "center", padding: 15},
  resNametext : {fontWeight:'bold', fontSize:25},
  resimageView : { padding: 15, alignItems: 'center'},
  resimage : { padding: 15,borderRadius: 10,width: '100%', height: 300},
  resHeadingView :{padding: 15,marginTop:10},
  resHeading : {fontWeight: 'bold', fontSize: 20},
  resLinkView : {paddingLeft: 15},
  resLinkText : {color: 'blue'}
})
