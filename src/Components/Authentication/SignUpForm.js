import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from '../common/index';
import { connect } from 'react-redux';
import { SignUpInfoUpdate, SignUp } from '../../actions/index';

class LoginForm extends React.Component {
    renderButton() {
        const { email, password, nume, prenume } = this.props;
        if (this.props.loading === true)
            return <Spinner size='large' />
        else
            return <Button onPress={() => this.props.SignUp({ email, password, nume, prenume })}>Inregsitreaza-te</Button>

    }
    renderError() {
        return <Text>{this.props.error}</Text>
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Card>
                    <CardSection style={{ justifyContent: 'center', borderBottomWidth: 0 }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Register</Text>
                    </CardSection>
                    <CardSection>
                        <Input label={"Nume:"} value={this.props.nume} onChangeText={(value) => this.props.SignUpInfoUpdate({ prop: 'nume', value: value })} />
                    </CardSection>
                    <CardSection>
                        <Input label={"Prenume:"} value={this.props.prenume} onChangeText={(value) => this.props.SignUpInfoUpdate({ prop: 'prenume', value: value })} />
                    </CardSection>

                    <CardSection>
                        <Input label={"Email:"} value={this.props.email} onChangeText={(value) => this.props.SignUpInfoUpdate({ prop: 'email', value: value })} />
                    </CardSection>
                    <CardSection>
                        <Input label={"Password:"} value={this.props.password} onChangeText={(value) => this.props.SignUpInfoUpdate({ prop: 'password', value: value })} securedText />
                    </CardSection>
                    {this.renderError()}
                    <CardSection>{this.renderButton()}</CardSection>
                </Card>
            </View>
        );
    }
}
mapStateToProps = (state) => {
    const { email, password, nume, prenume, loading, error } = state.register;
    return { email, password, nume, prenume, loading, error };
}
export default connect(mapStateToProps, { SignUpInfoUpdate, SignUp })(LoginForm);