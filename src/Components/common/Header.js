import React from 'react';
import {View, Text,StyleSheet,StatusBar} from 'react-native';
const Header=({headerText})=>{
    const {textStyle,viewStyle}=styles;
    return (
        <View style={viewStyle}>
        <StatusBar hidden={true}/>
            <Text style={textStyle}>{headerText}</Text>
        </View>
    );
}
const styles ={
    viewStyle:{
        backgroundColor:'#F8F8F8',
        justifyContent:'center',
        alignItems:'center',
        height:60,
        paddingTop:15,
        shadowColor:'#000',
        shadowOffset:{width:0,height:0},
        shadowOpacity:0.5,
        elevation:2,
    },
    textStyle:{
        fontSize:20
    }
}
export {Header};