import React,{ Component} from 'react';
import { View, Text,StatusBar,Image,BackHandler,ActivityIndicator,TouchableOpacity } from 'react-native';
import styles from './styles';
import images from '../../config/images'
import metrics from '../../config/metrics'
import Appstyles from '../../config/styles'
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';
import { NavigationActions, StackActions } from 'react-navigation';
import Share from 'react-native-share';
import LottieView from 'lottie-react-native';
import { WebView } from 'react-native-webview';
// import NetInfo from "@react-native-community/netinfo";
 class DetailsPage extends Component {
  constructor(props){
    super(props);
    this.state={
      switchState:this.props.darkMode,
      showLottie:true,
      loading:true,
      netStatus:true
    }
 
  }
  componentDidMount(){
    this.hideLottieHeader();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonSettings);
    
  }
 
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonSettings);
    
    
  }
  handleBackButtonSettings = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
  });
  this.props.navigation.dispatch(resetAction); 
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonSettings)
  return true;
  } 

  hideLottieHeader=()=>{
    setTimeout(()=> {
      this.setState({
        showLottie:false
      })
    }, 3500);
      }
  render (){
    const { darkMode } = this.props;
    const { link } = this.props.navigation.state.params
    return(
    <View style={darkMode?styles.containerDark:styles.container}>
       <StatusBar backgroundColor={darkMode?'black':Appstyles.color.COLOR_PRIMARY} barStyle='light-content'/>
       <View style={darkMode?styles.headerViewDark:styles.headerView}>
       {
        this.state.showLottie?<LottieView source={darkMode?require('../../assets/lottieJson/logoSplash.json'):
        require('../../assets/lottieJson/headerLottie.json')} autoPlay loop 
      style={{width:50,height:50}}/>:
      <Image source ={images.icons.logoWhite}style={{width:33,height:33,resizeMode:'contain',
      tintColor:darkMode?Appstyles.color.COLOR_PRIMARY:Appstyles.color.COLOR_WHITE}} />
        }
        </View>{
          !this.state.netStatus?
          <View style={{position:'absolute',top:'35%',width:'100%',justifyContent:'center',alignItems:'center'}}>
    <LottieView source={darkMode?require('../../assets/lottieJson/noInternetDark.json'):
    require('../../assets/lottieJson/noInternet.json')
    
    } autoPlay loop 
      style={{width:200,height:200}}/>
     
     </View>:
        <View style={{flex:1,backgroundColor:darkMode?Appstyles.color.COLOR_BLACK:'#e4e3e2'}}>
     <WebView
       ref={ref=>this.web=ref}
     source={{uri: link}}
     style={{backgroundColor:darkMode?Appstyles.color.COLOR_BLACK:'#e4e3e2'}}
     javaScriptEnabled={true}
      domStorageEnabled={true}
     onLoadStart={()=>this.setState({loading:true})}
     onLoad={()=>this.setState({loading:false})}
     onError={()=>this.setState({
      netStatus:false
     })}
     />
     {
       this.state.loading&&
    <View style={{position:'absolute',top:metrics.screenHeight*0.3,width:'100%',justifyContent:'center',alignItems:'center'}}>
    <LottieView source={darkMode?require('../../assets/lottieJson/loaderDark.json'):require('../../assets/lottieJson/loader.json')} autoPlay loop 
      style={{width:100,height:100}}/>
     </View>}
     </View>}
     {!this.state.netStatus&&
     <View style={{position:'absolute',
    bottom:10,width:'100%',
    justifyContent:'center',
    alignItems:'center'
    }}>
      {/* <TouchableOpacity
      activeOpacity={0.6}
      onPress={()=>{ this.web.reload() }}
       style={{
    borderRadius:5,
    paddingHorizontal:15,
    paddingVertical:10,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Appstyles.color.COLOR_PRIMARY}}>
    <Text style={{color:Appstyles.color.COLOR_WHITE}}>Reload</Text>
    </TouchableOpacity> */}
    </View>
    }
    </View>
  );
}
}
const mapStateToProps = state => ({
  darkMode:state.homeReducer.darkMode
});

export default connect(
  mapStateToProps,
  {
  }
)(DetailsPage);