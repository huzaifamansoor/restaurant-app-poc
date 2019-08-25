import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1
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
