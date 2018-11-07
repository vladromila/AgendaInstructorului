import React from 'react';
import {View,Text,TextInput} from 'react-native';

const Input=({onChangeText,value,label,securedText,placeholder,type})=>{
    return (
        <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>{label}</Text>
            <TextInput style={styles.inputStyle}
            keyboardType={type}
            secureTextEntry={securedText}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText} 
            autoCorrect={false}
            underlineColorAndroid={'rgba(0,0,0,0)'}
            
            />
        </View>

    );
}

const styles={
    inputStyle:{
        borderWidth:0.5,
        color:'#000',
        paddingRight:5,
        paddingLeft:5,
        fontSize:18,
        lineHeight:23,
        flex:2
    },
    labelStyle:{
        fontSize:18,
        paddingLeft:20,
        flex:1
    },
    containerStyle:{
        height:40,
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    }
}
export {Input};