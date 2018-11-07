import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import MainScreen from './MainScreen';
import AuthenticationNav from './Authentication';
import firebase from 'firebase';
import SplashScreen from './SplashScreen';

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      screen:'loading'
    }
  }
  render() {
    const App=app();
    return (
        <View style={{ flex: 1 }}>
          <App />
        </View>
    );
  }
}
const Main = createStackNavigator({
  Main: {
    screen: MainScreen
  }
  
},{
      headerMode:'screen'
  })
const Authentication = createStackNavigator({
  AuthenticationScreen: {
    screen: AuthenticationNav
  }
}, {
    headerMode: 'screen'
  })
const Splash = createStackNavigator({
  SplashScreen: {
    screen: SplashScreen
  }
})
const app = () => {
  return createSwitchNavigator({
    SignedIn: {
      screen: Main
    },
    SignedOut: {
      screen: Authentication
    },
    Loading:{
      screen:Splash
    }
  },
    {
      initialRouteName: "Loading"
    }
  )
}
