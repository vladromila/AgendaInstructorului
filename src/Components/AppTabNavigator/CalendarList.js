import React, { Component } from "react";
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'native-base'
import DayChoose from './DayChooseTab/DayChoose'
import AddClass from './HomeTab/AddClass';
import CalendarListTab from './CalendarListTab/CalendarListTab'

class DayChooseTab extends Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-calendar" style={{ color: tintColor }} />
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
    Calendar: {
        screen: CalendarListTab
    },
    DayChoose: {
        screen: DayChoose
    },
    AddClass: {
        screen: AddClass
    },

}, {
        initialRouteName: 'Calendar'
    })
