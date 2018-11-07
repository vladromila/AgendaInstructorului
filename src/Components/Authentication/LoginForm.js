import React from 'react';
import {Text,View} from 'react-native';
import {Card,CardSection,Input,Button,Spinner} from '../common/index';
import { Container, Content, Icon } from 'native-base'
import {connect} from 'react-redux';
import {LoginInfoUpdate,Login} from '../../actions/index'

class LoginForm extends React.Component{
    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home" style={{ color: tintColor }} />
        )
    }
    renderButton(){
        const {email,password}=this.props;
        if(this.props.loading===true)
        return <Spinner size='large'/>
        else
        return <Button onPress={()=>this.props.Login({email,password})}>Login</Button>

    }
    renderError(){
        return <Text>{this.props.error}</Text>
    }
    render(){
        return(
            <View style={{flex:1,justifyContent:'center'}}>
            <Card>
                <CardSection style={{justifyContent:'center',borderBottomWidth:0}}>
                    <Text style={{fontSize:22,fontWeight:'bold'}}>Login</Text>
                </CardSection>
                <CardSection>
                    <Input label={"Email:"} onChangeText={(value)=>this.props.LoginInfoUpdate({prop:'email',value:value})} value={this.props.email}/>
                </CardSection>
                <CardSection>
                    <Input label={"Password:"}  value={this.props.password} onChangeText={(value)=>this.props.LoginInfoUpdate({prop:'password',value:value})} securedText/>
                </CardSection>
                {this.renderError()}
                <CardSection>{this.renderButton()}</CardSection>
            </Card>
            </View>
        );
    }
    
}
const mapStateToProps=(state)=>{
    const{email,password,loading,error}=state.login;
    return {email,password,loading,error}
}
export default connect(mapStateToProps,{LoginInfoUpdate,Login})(LoginForm);