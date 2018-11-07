import React from 'react';
import { Spinner } from './common';
import firebase from 'firebase';

class SplashScreen extends React.Component{
    componentWillMount(){
        const {navigation}=this.props;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
         navigation.navigate('SignedIn')
        } else {
            navigation.navigate('SignedOut')
        }
      });

    }
    render(){
        return(
            <Spinner size="large"/>
        );
    }
}

export default SplashScreen;