import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { createStackNavigator } from 'react-navigation';
import StudentsHome from './StudentsTab/StudentsHome';
import AddStudent from './StudentsTab/AddStudent';
import StudentProfile from './StudentsTab/StudentProfile';
import EditStudent from './StudentsTab/EditStudent'
import DoneClasses from './StudentsTab/DoneClasses'
import CanceledClasses from './StudentsTab/CanceledClasses'

import { Icon } from 'native-base'


class LikesTab extends Component {

    static navigationOptions = {
        title: 'Elevi Activi',
        titleStyle:{
            color:'white',
            fontColor:'white'
        }
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StudentsTab />
            </View>
        );
    }
}
const StudentsTab = createStackNavigator({
    StudentsHome: {
        screen: StudentsHome
    },
    AddStudent: {
        screen: AddStudent
    },
    StudentProfile: {
        screen: StudentProfile
    },
    EditStudent: {
        screen: EditStudent
    },
    DoneClasses: {
        screen: DoneClasses
    },
    CanceledClasses: {
        screen: CanceledClasses
    }
},
    {
        initialRouteName: 'StudentsHome'
    })
export default LikesTab;
