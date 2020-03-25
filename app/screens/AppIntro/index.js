import React,{ Component} from 'react';
import { View, Text,StatusBar,TouchableOpacity } from 'react-native';
import styles from './styles';
import metrics from '../../config/metrics'
import Appstyles from '../../config/styles'
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import SplashScreen from 'react-native-splash-screen'
import { connect } from "react-redux";
import Swiper from 'react-native-swiper'
import { skipIntro }from '../../actions/homeActions.js';
class AppIntro extends Component {
  constructor(props){
    super(props);
    this.state={
      index:0
    }

  }
  componentDidMount(){
  }
  setSkipped=()=>{
    const { skipIntro } = this.props;
    skipIntro();
    this.props.navigation.navigate('Home')
  }
  render (){
    const {index}= this.state;
    return(
    <View style={styles.container}>
       <StatusBar backgroundColor={Appstyles.color.COLOR_PRIMARY} barStyle='light-content'/>
    
       <Swiper style={styles.wrapper} loop={false} 
       activeDotColor="#2988ae"

       onIndexChanged={(i)=>this.setState({index:i})}
       >
        <View style={styles.slide1}>
        <LottieView source={
     require('../../assets/lottieJson/eye.json')} autoPlay loop 
     style={{width:200,height:200,marginTop:50}}
     />
     <Text 
     style={styles.bottomText}
     >Explore every react-native libraries </Text>
        </View>
        <View style={styles.slide1}>
        <LottieView source={
     require('../../assets/lottieJson/favorite.json')} autoPlay loop 
     style={{width:200,height:200,marginTop:50}}
     />
     <Text 
     style={styles.bottomText}
     >Swipe and save your favorite libraries</Text>
        </View>
        <View style={styles.slide1}>
        <LottieView source={
     require('../../assets/lottieJson/share.json')} autoPlay loop 
     style={{width:200,height:200,marginTop:50}}
     />
     <Text 
     style={styles.bottomText}
     >Share the libraries with your friends</Text>
        </View>
        <View style={styles.slide1}>
        <LottieView source={
     require('../../assets/lottieJson/nightMode.json')} autoPlay loop 
     style={{width:200,height:200,marginTop:50}}
     />
     <Text 
     style={styles.bottomText}
     >Enable dark mode to keep your eyes comfort</Text>
        </View>
        
      </Swiper>{
        index!==3&&
        <TouchableOpacity onPress={()=>this.setSkipped()} 
          style={{position:'absolute',top:15,right:15}}
          >
          <Text style={{color:'#2988ae',fontWeight:'bold'}}>Skip>></Text>
          </TouchableOpacity>
      }
      
          {
            index===3&&
            <View style={{width:'100%',position:'absolute',bottom:50,justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>this.setSkipped()} 
          style={{paddingVertical:10,backgroundColor:"#2988ae",borderRadius:3,paddingHorizontal:30}}
          >
          <Text style={{color:Appstyles.color.COLOR_WHITE,fontWeight:'bold',textAlign:'center'}}>Start</Text>
          </TouchableOpacity>
          </View>
          }
    </View>
  );
}
}
const mapStateToProps = state => ({
});

export default connect(
  mapStateToProps,
  {
    skipIntro
  }
)(AppIntro);