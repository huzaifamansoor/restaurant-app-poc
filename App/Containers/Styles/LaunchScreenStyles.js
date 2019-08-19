import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  bgimage :{ borderRadius: 10,width: '100%', height: 200},
  
  renderContainer : {flex: 1, padding: 15, alignItems: 'center'},
  
  absoluteView : {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader : {
    alignItems: 'center',
    justifyContent : 'center'
  }
  ,
  bgText : {color: 'white',fontSize: 30,fontWeight: 'bold'}
})
