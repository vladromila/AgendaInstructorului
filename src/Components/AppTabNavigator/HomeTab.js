import React, { Component } from "react";
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'native-base'
import Home from './HomeTab/Home';
import AddClass from './HomeTab/AddClass';
import EditClass from './HomeTab/EditClass';

class HomeTab extends Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home" style={{ color: tintColor }} />
        ),
        
    }

    render() {
        return (
          <HomeTabNav/>
                   
        );
    }
}
export default HomeTab;
const HomeTabNav=createStackNavigator({
    Home:{
        screen:Home
    },
    AddClass:{
        screen:AddClass
    },
    EditClass:{
        screen:EditClass
    }
},{
    initialRouteName:'Home'
})
