import React, { Component } from "react";
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'native-base'
import Profile from './ProfileTab/ProfileTab'
import AddMoney from './ProfileTab/AddMoney';
import AStudents from './ProfileTab/AStudents';
import RStudents from "./ProfileTab/RStudents";

class DayChooseTab extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="person" style={{ color: tintColor }} />
        ),

    }

    render() {
        return (
            <DayChooseTabNav />

        );
    }
}
export default DayChooseTab;
const DayChooseTabNav = createStackNavigator({
    Profile: {
        screen: Profile
    },
    AddMoney: {
        screen: AddMoney
    },
    AStudents: {
        screen: AStudents
    },
    RStudents: {
        screen: RStudents
    }
}, {
        initialRouteName: 'Profile'
    })
