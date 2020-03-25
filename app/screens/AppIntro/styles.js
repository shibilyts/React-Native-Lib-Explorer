import { StyleSheet } from 'react-native';
import Appstyles from '../../config/styles'
import metrics from '../../config/metrics'
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor:Appstyles.color.COLOR_WHITE
  },
  slide1: {
    flex: 1,
    
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  bottomText:{width:'80%',textAlign:'center',color:'#2988ae',position:'absolute',bottom:'20%',fontWeight:'bold',fontSize:20},
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});

export default styles;
