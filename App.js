import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import reducers from './src/reducers/index';
import ReduxThunk from 'redux-thunk';
import AppMain from './src/Components/AppMain';
import { FIREBASE_CONFIG } from './env';

export default class App extends React.Component {
  constructor() {
    super();
    console.ignoredYellowBox = ['TabNavigator'];
  }
  componentWillMount() {var config=FIREBASE_CONFIG
    firebase.initializeApp(config);
  }
  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <View style={{ flex: 1 }}>
          <AppMain />
        </View>
      </Provider>
    );
  }
}