import { StyleSheet } from 'react-native';
import Appstyles from '../../config/styles'
import metrics from '../../config/metrics'
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor:Appstyles.color.COLOR_WHITE
  },
  containerDark:{
    flex: 1,
    
     backgroundColor:Appstyles.color.COLOR_BLACK
  },
  titleView:{position:'absolute',bottom:30,justifyContent:'center',alignItems:'center',width:metrics.screenWidth},
  titleText:{color:Appstyles.color.COLOR_PRIMARY,fontSize:18,fontWeight:'bold'}
});

export default styles;
