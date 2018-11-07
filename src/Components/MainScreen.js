import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";

import HomeTab from './AppTabNavigator/HomeTab'
import DayChooseTab from './AppTabNavigator/DayChooseTab'
import ProfileTab from './AppTabNavigator/ProfileTab'
import ExamsTab from "./AppTabNavigator/ExamsTab";
import StudentsTab from './AppTabNavigator/StudentsTab';

import { TabNavigator, createTabNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import { Icon } from 'native-base'


class MainScreen extends Component {
    constructor() {
        super();
        console.disableYellowBox = true;
    }

    static navigationOptions = {

        header: null
    }

    render() {
        return (
            <AppTabNavigator />
        );
    }
}
export default MainScreen;
const AppTabNavigator = createMaterialTopTabNavigator({

    HomeTab: {
        screen: HomeTab
    },
    AddMediaTab: {
        screen: DayChooseTab
    },
    ExamsTab: {
        screen: ExamsTab
    },
    Students: {
        screen: StudentsTab
    },
    ProfileTab: {
        screen: ProfileTab
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
            showIcon: true,

        }
    })

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});