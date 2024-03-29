import { StyleSheet } from 'react-native';
import Appstyles from '../../config/styles'
import metrics from '../../config/metrics'
const styles = StyleSheet.create({
  container: {
  backgroundColor:"#e4e3e2",
  flex:1
  },
  containerDark:{
    backgroundColor:Appstyles.color.COLOR_BLACK,
    flex:1
  },
  headerView:{backgroundColor:Appstyles.color.COLOR_PRIMARY ,
    width:metrics.screenWidth,height:37,justifyContent:'center',alignItems:'center'},
    headerViewDark:{
      backgroundColor:Appstyles.color.COLOR_BLACK ,
      width:metrics.screenWidth,height:37,justifyContent:'center'
      ,alignItems:'center',
      borderBottomWidth:0.5,
      borderBottomColor:'#49595f'
    },
    headerImage:{width:25,height:25,tintColor:Appstyles.color.COLOR_WHITE,resizeMode:'contain',  transform: [{ rotate: '90deg'}]
  },
});

export default styles;
