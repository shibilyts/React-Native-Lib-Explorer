import React,{ Component} from 'react';
import { View, Text,StatusBar,Image,BackHandler,Switch,TouchableOpacity,Linking } from 'react-native';
import styles from './styles';
import images from '../../config/images'
import metrics from '../../config/metrics'
import Appstyles from '../../config/styles'
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';
import { NavigationActions, StackActions } from 'react-navigation';
import { setDarkMode }from '../../actions/homeActions.js';
import Share from 'react-native-share';
import LottieView from 'lottie-react-native';
 class Settings extends Component {
  constructor(props){
    super(props);
    this.state={
      switchState:this.props.darkMode,
      showLottie:true,
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
  setSwitchState=(state)=>{
    this.props.setDarkMode(state)
  }
  openLinkedIn=()=>{
    const url ="https://www.linkedin.com/in/mohammed-shibily-a69821b5/"
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // console.log("Don't know how to open URI: " + this.props.url);
      }
    });
  }
  shareApp=()=>{
    const shareOptions = {
      title: 'React Native Lib Explorer',
      message: ' React Native Lib Explorer- check this cool application to explore react native libraries',
      url: 'App link',
  };
  Share.open(shareOptions);
  }
  sendFeedback=()=>{
    const shareOptions = {
      title: 'Share feedback',
      message: '',
      subject:'Feedback',
      url: '',
      social: Share.Social.EMAIL,
      email:'mdshibi007@gmail.com'
      
  };
  Share.shareSingle(shareOptions);
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
        </View>
     <View style={darkMode?styles.sectionViewDark:styles.sectionView}>
       <Text style={{color:Appstyles.color.COLOR_PRIMARY,fontWeight:'700'}}>Enable Dark Mode</Text>
       <Switch value={this.props.darkMode}
       trackColor={{false : Appstyles.color.COLOR_PRIMARY, true: Appstyles.color.COLOR_PRIMARY}}

       onValueChange={switchState => this.setSwitchState(switchState)}
       />
     </View>
     <TouchableOpacity style={darkMode?styles.sectionViewDark:styles.sectionView}
     activeOpacity={0.6}
     onPress={()=>this.sendFeedback()}
     >
     <Text style={{color:Appstyles.color.COLOR_PRIMARY,fontWeight:'700'}}>Send Feedbacks</Text>
     <Image source ={images.icons.feedback}style={{width:25,height:25,
     resizeMode:'contain',tintColor:Appstyles.color.COLOR_PRIMARY,marginRight:10}} />
     </TouchableOpacity>
     <TouchableOpacity style={darkMode?styles.sectionViewDark:styles.sectionView}
     activeOpacity={0.6}
      onPress={()=>this.shareApp()}
     >
     <Text style={{color:Appstyles.color.COLOR_PRIMARY,fontWeight:'700'}}>Share</Text>
     <Image source ={images.icons.shareApp}style={{width:25,height:25,
     resizeMode:'contain',tintColor:Appstyles.color.COLOR_PRIMARY,marginRight:10}} />
     </TouchableOpacity>
     <TouchableOpacity style={darkMode?styles.sectionViewDark:styles.sectionView}
     activeOpacity={0.6}
     onPress={()=>this.openLinkedIn()}
     >
     <Text style={{color:Appstyles.color.COLOR_PRIMARY,fontWeight:'700'}}>Dev Profile</Text>
     <Image source ={images.icons.worker}style={{width:25,height:25,
     resizeMode:'contain',tintColor:Appstyles.color.COLOR_PRIMARY,marginRight:10}} />
     </TouchableOpacity>
     <View style={styles.versionView}>
       <Text style={darkMode?styles.versionTextDark:styles.versionText}>Version 1.0.1</Text>
       </View>
     
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
    setDarkMode
  }
)(Settings);