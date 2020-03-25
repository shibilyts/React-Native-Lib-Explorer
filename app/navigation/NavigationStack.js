import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from 'app/screens/Home';
import LottieSplash from 'app/screens/LottieSplash';
import Liked from 'app/screens/Liked';
import Settings from 'app/screens/Settings';
import DetailsPage from 'app/screens/DetailsPage';
import AppIntro from 'app/screens/AppIntro';
const RNApp = createStackNavigator(
  {
    LottieSplash: {
      screen: LottieSplash,
    },
    Home: {
      screen: Home,
    },
    Liked:{
      screen: Liked,
      
    },
    Settings:{
      screen: Settings,
      
    },
    DetailsPage:{
      screen: DetailsPage,
    },
    AppIntro:{
      screen: AppIntro,
    }
  },
  
  {
    initialRouteName: 'LottieSplash',
    headerMode:'none'
  },
);

export default createAppContainer(RNApp);
