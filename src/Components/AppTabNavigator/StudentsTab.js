import React, { Component } from "react";
import {
    View,
} from "react-native";
import Students from './Students';
import InStudents from './StudentsTab/InStudentsHome'
import { createMaterialTopTabNavigator } from 'react-navigation'

import { Icon } from 'native-base'


class StudentsTabComponent extends Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-people" style={{ color: tintColor }} />
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StudentsTab />
            </View>
        );
    }
}
const StudentsTab = createMaterialTopTabNavigator({
    StudentsHome: {
        screen: Students
    },
    InStudentsHome: {
        screen: InStudents
    }
},
    {
        animationEnabled: false,
        swipeEnabled: false,
        tabBarPosition: "bottom",
        tabBarOptions: {
            style: {
                backgroundColor: '#1E6EC7'
            },
            activeTintColor: '#000',
            inactiveTintColor: '#d1cece',
            showLabel: true,
            showIcon: false,
            labelStyle: {
                color:'white',
                fontWeight: 'bold'
            }
        }
    })
export default StudentsTabComponent;
