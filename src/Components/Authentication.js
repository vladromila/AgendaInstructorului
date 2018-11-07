import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";
import LoginForm from './Authentication/LoginForm';
import SignUpForm from './Authentication/SignUpForm';
import { TabNavigator } from 'react-navigation'
import { Icon } from 'native-base'

class AuthenticationScreen extends Component {
    constructor(){
        super();
        console.disableYellowBox = true;
    }

    static navigationOptions = {
header:null
    }

    render() {
        return (
            <Authentication />
        );
    }
}
export default AuthenticationScreen;

const Authentication = TabNavigator({

    LoginForm: {
        screen: LoginForm
    },
    SignUpForm:{
        screen:SignUpForm
    }

}, {
        animationEnabled: true,
        swipeEnabled: true,
        tabBarPosition: "bottom",
        tabBarOptions: {
            style: {
                ...Platform.select({
                    android: {
                        backgroundColor: 'white'
                    }
                })
            },
            activeTintColor: '#000',
            inactiveTintColor: '#d1cece',
            showLabel: false,
            showIcon: true
        }
    })
