import { StyleSheet } from 'react-native';
import Appstyles from '../../config/styles'
import metrics from '../../config/metrics'
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor:'#e4e3e2'
  },
  containerDark:{
    flex: 1,
    
     backgroundColor:'black'
  },
  sectionView:{width:'100%',borderBottomWidth:0.5,borderColor:'#d2d2d0',
  justifyContent:'space-between',flexDirection:'row', alignItems:'center', paddingHorizontal:15,paddingVertical:10},
  sectionViewDark:{
    width:'100%',borderBottomWidth:0.5,borderColor:'#49595f',
    justifyContent:'space-between',flexDirection:'row', alignItems:'center', paddingHorizontal:15,paddingVertical:10
  },
  titleText:{color:Appstyles.color.COLOR_PRIMARY,fontSize:18,fontWeight:'bold'},
  headerView:{backgroundColor:Appstyles.color.COLOR_PRIMARY ,
    width:metrics.screenWidth,height:37,justifyContent:'center',alignItems:'center'},
    headerViewDark:{
      backgroundColor:Appstyles.color.COLOR_BLACK ,
      width:metrics.screenWidth,height:37,justifyContent:'center',alignItems:'center',
      borderBottomWidth:0.5,borderBottomColor:"#49595f"
    },
    versionView:{
      position:'absolute',
      bottom:15,
     width:'100%',
     justifyContent:'center',
     alignItems:'center'
    },
    versionTextDark:{
      color:Appstyles.color.COLOR_PRIMARY,
      fontSize:14
    },
    versionText:{
      color:'#adaca9',
      fontSize:14
    }
  
});

export default styles;
