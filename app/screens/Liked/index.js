import React,{Component} from 'react';
import { View, Text,StatusBar,Image,ScrollView,TouchableOpacity,TextInput,BackHandler } from 'react-native';
import styles from './styles';
import Appstyles from '../../config/styles'
import images from '../../config/images'
import Swipeable from 'react-native-swipeable';
import data from '../../config/data'
import { connect } from "react-redux";
import Share from 'react-native-share';
import metrics from '../../config/metrics'
import LottieView from 'lottie-react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { addFavToReducer,
  deleteFavToReducer }from '../../actions/homeActions.js';
  import {
    AdMobBanner,
  } from 'react-native-admob'
 class Liked extends Component {
  constructor(props){
    super(props);
    this.state={
      toggle:false,
      showLottie:true,
      rotate:0,
      currentlyOpenSwipeable:null
    }
  }
  componentDidMount(){
    this.hideLottieHeader();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonLiked);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonLiked);
  }
  handleBackButtonLiked = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
  });
  this.props.navigation.dispatch(resetAction); 
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonLiked)
  return true;
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
  onOpen =(event, gestureState, swipeable) => {
    const {currentlyOpenSwipeable} = this.state;
    if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
      currentlyOpenSwipeable.recenter();
    }

    this.setState({currentlyOpenSwipeable: swipeable});
  };
  onClose=() => {
    this.setState({currentlyOpenSwipeable: null})
}

  renderItem=(item,index)=>{
    const {darkMode} = this.props;
    const reducerState= this.props.fav
    const isPresent=reducerState.findIndex(Item=>Item===item.newIndex);
    const rightButtons = [
      <TouchableOpacity style={{backgroundColor:darkMode?'#49595f':Appstyles.color.COLOR_PRIMARY,justifyContent:'center',width:'50%',minHeight:'100%'}}
      activeOpacity={0.8}
      onPress={()=>this.onPressShare(item)}
      >
        <View style={{alignItems:'center',width:'50%'}}>
          <Image source={images.icons.share} style={{width:25,height:25,resizeMode:'contain',tintColor:Appstyles.color.COLOR_WHITE}}/>
        <Text style={{color:Appstyles.color.COLOR_WHITE}}>Share</Text>
        </View>
        </TouchableOpacity>
        ,
      <TouchableOpacity style={{backgroundColor:darkMode?'#354145':'#2988ae',justifyContent:'center',width:'50%',minHeight:'100%'}}
      onPress={()=>this.onLikePress(item.newIndex)}
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
     <View key={index.toString()}>
    {index==0&&
      <View  style={{borderBottomWidth:0.5,width:'100%',
      borderColor:darkMode?"#49595f":'#d2d2d0',
      height:30,backgroundColor:darkMode?'#354145':"#adaca9",
      justifyContent:'center',paddingVertical:10}}
      
      >
      <Text style={{color:darkMode?Appstyles.color.COLOR_WHITE:Appstyles.color.COLOR_SECONDARY,fontSize:18,fontWeight:'bold',marginLeft:10}}>Favorites</Text>
      </View>}
    
         <Swipeable rightButtons={rightButtons} style={{borderBottomWidth:0.5,borderColor:darkMode?'#49595f':'#d2d2d0',
         width:'100%',minHeight:70,backgroundColor:darkMode?Appstyles.color.COLOR_BLACK:'#e4e3e2'}}
          onRightButtonsOpenRelease={this.onOpen}
          onRightButtonsCloseRelease={this.onClose}
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
  const newDate=[];
  this.props.fav.map(item=>{
    if(data[item]){
      
      data[item].newIndex=item;
      newDate.push(data[item])
    }
  })
  return (
    <View style={darkMode?styles.containerDark:styles.container}>
      <StatusBar backgroundColor={darkMode?Appstyles.color.COLOR_BLACK:Appstyles.color.COLOR_PRIMARY} barStyle='light-content'/>
      <View style={darkMode?styles.headerViewDark:styles.headerView}>{
        this.state.showLottie?<LottieView source={darkMode?require('../../assets/lottieJson/logoSplash.json')
        :require('../../assets/lottieJson/headerLottie.json')} autoPlay loop 
      style={{width:50,height:50,}}/>:
      <Image source ={images.icons.logoWhite}style={{width:33,height:33,resizeMode:'contain',
      tintColor:darkMode?Appstyles.color.COLOR_PRIMARY:Appstyles.color.COLOR_WHITE}} />
        }
        <TouchableOpacity style={{position:'absolute',right:10,top:'20%',justifyContent:'center'}}>
        <Image source={images.icons.heartSelected}
        style={{
        tintColor:darkMode?Appstyles.color.COLOR_PRIMARY:Appstyles.color.COLOR_WHITE,
         width:25,height:25,resizeMode:"contain"}}/>
         <Text style={{position:'absolute',top:-8,right:0,color:darkMode?Appstyles.color.COLOR_WHITE:"#227191",fontWeight:'800'}}>{this.props.fav.length}</Text>
         </TouchableOpacity>
        </View>
        {/* <View style={{height:50,width:'100%'}}>
          <TextInput style={{flex:1,padding:10}}/>
          </View> */}
          <ScrollView
          contentContainerStyle={{paddingBottom:20}}
          >
          {newDate.map((Item,index)=>{
            return this.renderItem(Item,index)
          })}
          {newDate.length===0&&
            <View style={{width:metrics.screenWidth,height:metrics.screenHeight*.8,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:darkMode?Appstyles.color.COLOR_WHITE:Appstyles.color.COLOR_SECONDARY,fontWeight:'bold'}}>You don't have any favorite item</Text>
            </View>}
          </ScrollView>
        {/* <FlatList
      renderItem={this.renderItem}
      data={newDate}
      extraData={this.state}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{paddingBottom:20}}
      ListEmptyComponent={()=>{
        return(
         
        )
      }}
      /> */}
      <View style={{width:'100%',
      justifyContent:'center',alignItems:'center'}}>
        <AdMobBanner
  adSize="banner"
  adUnitID="ca-app-pub-1587586515943690/2710599997"
  onAdFailedToLoad={error => {
  //console.log(error)
  }}
  />
  </View>
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
)(Liked);