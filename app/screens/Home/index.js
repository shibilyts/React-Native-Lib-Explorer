import React,{Component} from 'react';
import { View, Text,StatusBar,Image,FlatList,TouchableOpacity,TextInput,BackHandler,ToastAndroid,Button } from 'react-native';
import styles from './styles';
import Appstyles from '../../config/styles'
import images from '../../config/images'
import Swipeable from 'react-native-swipeable';
import data from '../../config/data'
import { connect } from "react-redux";
import Share from 'react-native-share';
import LottieView from 'lottie-react-native';
import { addFavToReducer,
  deleteFavToReducer }from '../../actions/homeActions.js';
  import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
  } from 'react-native-admob'
 class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      toggle:false,
      showLottie:true,
      rotate:0,
      backPressed: 0
    }
  }
  

  handleBackButtonHome = () => {
  if (this.state.backPressed > 0) {
    BackHandler.exitApp();
    this.setState({ backPressed: 0 });
  } else {
    this.setState({ backPressed: this.state.backPressed + 1 });
    ToastAndroid.show("Press again to exit", ToastAndroid.LONG);
    setTimeout(() => {
      this.setState({ backPressed: 0 });
    }, 2000);
    return true;
  }
} 
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonHome);
  }
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonHome);
    this.hideLottieHeader();
  }
  hideLottieHeader=()=>{
setTimeout(()=> {
  this.setState({
    showLottie:false
  })
}, 3500);
  }
  onLikePress=(index)=>{
    const { addFavToReducer } = this.props;
    const reducerState= this.props.fav
    this.setState({
      toggle:!this.state.toggle
    })
    const isAvailable=reducerState.findIndex(item=>item===index)
    
    if(isAvailable>-1){
      reducerState.splice(isAvailable,1);
       addFavToReducer(reducerState)
    }
    else{
      reducerState.push(index);
      addFavToReducer(reducerState)
    }
  }
  onPressShare=(item)=>{
    const options={
      url:item.link,
      message:'Check this cool react native  library I found from React Native Lib Explorer App',
      title:item.title
    }
    Share.open(options);
  }
  navToWebView=(item)=>{
    this.props.navigation.navigate('DetailsPage',{link:item.link})
  }
 
  renderItem=({item,index})=>{
    const { darkMode } = this.props;
    const reducerState= this.props.fav
    const isPresent=reducerState.findIndex(item=>item===index);
    const rightButtons = [
      <TouchableOpacity style={{backgroundColor:darkMode?'#49595f':Appstyles.color.COLOR_PRIMARY,justifyContent:'center',width:'50%',minHeight:'100%'}}
      activeOpacity={0.8}
      onPress={()=>this.onPressShare(item)}
      >
        <View style={{alignItems:'center',width:'50%'}}>
          <Image source={images.icons.share} style={{width:25,height:25,resizeMode:'contain',tintColor:Appstyles.color.COLOR_WHITE}}/>
        <Text style={{color:Appstyles.color.COLOR_WHITE}}>Share</Text>
        </View>
        </TouchableOpacity>,
      <TouchableOpacity style={{backgroundColor:darkMode?'#354145':'#2988ae',justifyContent:'center',width:'50%',minHeight:'100%'}}
      onPress={()=>this.onLikePress(index)}
        activeOpacity={0.8}>
        <View style={{alignItems:'center',width:'50%'}}>{
          isPresent>-1?<Image source={images.icons.heartSelected} style={{width:25,height:25,resizeMode:'contain',tintColor:Appstyles.color.COLOR_WHITE}}/>:
          <Image source={images.icons.heart} style={{width:25,height:25,resizeMode:'contain',tintColor:Appstyles.color.COLOR_WHITE}}/>
          }
          {/* <Image source={images.icons.heart} style={{width:25,height:25,resizeMode:'contain',tintColor:Appstyles.color.COLOR_WHITE}}/> */}
        <Text style={{color:Appstyles.color.COLOR_WHITE}}>Like</Text>
        </View>
      </TouchableOpacity>
    ];
    return(
     <View>
    {index!==data.length-1&&data[index].type!==data[index+1].type&&data[index].type||index==0&&
      <View  style={{borderBottomWidth:0.5,width:'100%',
      borderBottomColor:darkMode?"#49595f":'#d2d2d0',
      height:30,backgroundColor:darkMode?'#354145':"#adaca9",
      justifyContent:'center',paddingVertical:10}}
      
      >
      <Text style={{color:darkMode?Appstyles.color.COLOR_WHITE:Appstyles.color.COLOR_SECONDARY,fontSize:18,fontWeight:'bold',marginLeft:10}}>{item.type}</Text>
      </View>}
      {index%10===0&&index!==0&&
      <View style={{width:'100%',padding:10}}>
        <AdMobBanner
  adSize="banner"
  adUnitID="ca-app-pub-1587586515943690/2710599997"
  onAdFailedToLoad={error => {
  //console.log(error)
  }}
  />
</View>
      
      }
    
         <Swipeable rightButtons={rightButtons} style={{borderBottomWidth:0.5,borderColor:darkMode?'#49595f':'#d2d2d0',
         width:'100%',minHeight:70,backgroundColor:darkMode?Appstyles.color.COLOR_BLACK:'#e4e3e2'}}
         
         >
         
             <TouchableOpacity style={{width:'100%',minHeight:70}}onPress={()=>this.navToWebView(item)}
             activeOpacity={0.8}
               >
               <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',marginTop:10}}>
        <Text style={{color:Appstyles.color.COLOR_PRIMARY,fontSize:16,fontWeight:'bold',marginLeft:10,}}>{item.title}</Text>
        <Text style={{marginRight:10,color:Appstyles.color.COLOR_PRIMARY}}>{item.stars}</Text>
        </View>
        <Text style={{margin:10,width:'85%',color:darkMode?'#49595f':Appstyles.color.COLOR_BLACK}}>{item.description}</Text>
        
         </TouchableOpacity>
         <Image source={images.icons.next} style={{width:15,height:15,resizeMode:'contain',
         tintColor:darkMode?'#49595f':'#d2d2d0',position:'absolute',right:10,bottom:'30%'}}/>
        </Swipeable>
       </View>
    )
  }

render(){
  const { darkMode } = this.props;
  return (
    <View style={darkMode?styles.containerDark:styles.container}>
      <StatusBar backgroundColor={darkMode?Appstyles.color.COLOR_BLACK:Appstyles.color.COLOR_PRIMARY} barStyle='light-content'/>
      <View style={darkMode?styles.headerViewDark:styles.headerView}>{
        this.state.showLottie?<LottieView source={darkMode?require('../../assets/lottieJson/logoSplash.json'):
        require('../../assets/lottieJson/headerLottie.json')} autoPlay loop 
      style={{width:50,height:50}}/>:
      <Image source ={images.icons.logoWhite}style={{width:33,height:33,resizeMode:'contain',
      tintColor:darkMode?Appstyles.color.COLOR_PRIMARY:Appstyles.color.COLOR_WHITE}} />
        }
        <TouchableOpacity style={{position:'absolute',right:15,top:'20%',justifyContent:'center'}}
        onPress={()=>{this.props.navigation.navigate('Liked')}}
        >
        <Image source={images.icons.heartSelected}
        style={{
        tintColor:darkMode?Appstyles.color.COLOR_PRIMARY:Appstyles.color.COLOR_WHITE,
         width:20,height:20,resizeMode:"contain"}}/>
         <Text style={{position:'absolute',top:-8,right:0,color:darkMode?Appstyles.color.COLOR_WHITE:"#227191",fontWeight:'600'}}>{this.props.fav.length}</Text>
         </TouchableOpacity>
         <TouchableOpacity style={{position:'absolute',left:15,top:'20%',justifyContent:'center'}}
        onPress={()=>{
          this.props.navigation.navigate('Settings')
          }}
        >
        <Image source={images.icons.settings}
        style={{
        tintColor:darkMode?Appstyles.color.COLOR_PRIMARY:Appstyles.color.COLOR_WHITE,
         width:20,height:20,resizeMode:"contain"}}/>
         </TouchableOpacity>
        </View>
        {/* <View style={{height:50,width:'100%'}}>
          <TextInput style={{flex:1,padding:10}}/>
          </View> */}
        <FlatList
      renderItem={this.renderItem}
      data={data}
      extraData={this.state}
      contentContainerStyle={{paddingBottom:20}}
      keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
}
const mapStateToProps = state => ({
  fav:state.homeReducer.fav,
  darkMode:state.homeReducer.darkMode,
});

export default connect(
  mapStateToProps,
  {
    addFavToReducer,
    deleteFavToReducer
  }
)(Home);