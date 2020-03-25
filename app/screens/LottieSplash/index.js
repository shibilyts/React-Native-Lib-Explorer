import React,{ Component} from 'react';
import { View, Text,StatusBar } from 'react-native';
import styles from './styles';
import metrics from '../../config/metrics'
import Appstyles from '../../config/styles'
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import SplashScreen from 'react-native-splash-screen'
import { connect } from "react-redux";
class LottieSplash extends Component {
  constructor(props){
    super(props);
    this.state={
      showTitle:false
    }
    SplashScreen.hide();
  }
  componentDidMount(){
    this.navToHome();
  }
  navToHome=()=>{
    const { skipAppIntro } = this.props;
    setTimeout(()=> {
      this.setState({
        showTitle:true
      })
    }, 3700);
    setTimeout(()=> {
      if(skipAppIntro){
        this.props.navigation.navigate('Home');
      }
      else{
        this.props.navigation.navigate('AppIntro');
      }
     
    }, 4500);
  }
  render (){
    const { darkMode } = this.props;
    return(
    <View style={darkMode?styles.containerDark:styles.container}>
       <StatusBar backgroundColor={darkMode?Appstyles.color.COLOR_BLACK:Appstyles.color.COLOR_PRIMARY} barStyle='light-content'/>
     <LottieView source={darkMode?require('../../assets/lottieJson/logoSplash.json'):
     require('../../assets/lottieJson/logoSplash.json')} autoPlay loop />
     <View style={styles.titleView}>{
       this.state.showTitle&&
            <Animatable.Text animation="flipInY" style={styles.titleText}>React Native Lib-Explorer</Animatable.Text>
       }
     </View>
    </View>
  );
}
}
const mapStateToProps = state => ({
  darkMode:state.homeReducer.darkMode,
  skipAppIntro:state.homeReducer.skipAppIntro,
});

export default connect(
  mapStateToProps,
  {
  }
)(LottieSplash);