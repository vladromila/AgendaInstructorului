import React, { Component } from "react";
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'native-base'
import ExamsList from './ExamsTab/ExamsList'
import EditClass from "./HomeTab/EditClass";

class ExamsTab extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="car" style={{ color: tintColor }} />
        ),

    }

    render() {
        return (
            <ExamsTabNav />

        );
    }
}
export default ExamsTab;
const ExamsTabNav = createStackNavigator({
    ExamList: {
        screen: ExamsList
    },
    EditExam:{
        screen:EditClass
    }
}, {
        initialRouteName: 'ExamList'
    })
