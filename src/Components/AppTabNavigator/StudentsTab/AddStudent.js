import React from 'react';
import { Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from '../../common/index';
import { connect } from 'react-redux';
import { studentInfoUpdate, studentCreate } from '../../../actions/index'

class AddStudent extends React.Component {

    constructor() {
        super()
        this.state = {
            nume: null,
            phone: null,
            cnp: null,
            registru: null,
            serie: null
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Adauga un elev",
            headerStyle: {
                backgroundColor: '#1E6EC7'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                color: 'white',
                fontWeight: 'bold',
            }
        }
    }
    componentDidUpdate() {
        if (this.props.success === true)
            this.props.navigation.navigate('StudentsHome');
    }
    renderButton() {
        const { nume, phone, cnp, registru, serie } = this.state;
        if (this.props.loading == true)
            return <Spinner size='large' />
        else
            return <Button onPress={() => {
                this.props.studentCreate({ nume, phone, cnp, registru, serie })
            }}>Adauga Elev</Button>
    }
    renderError() {
        return <Text>{this.props.error}</Text>
    }
    render() {
        console.log(this.props.navigation.state.params.students)
        return (
            <Card>
                <CardSection>
                    <Input label='Nume' value={this.state.nume} onChangeText={(value) => {
                        this.setState({ nume: value })
                    }} />
                </CardSection>
                <CardSection>
                    <Input label='Numar de Telefon' type={'phone-pad'} value={this.state.phone} onChangeText={(value) => {
                        this.setState({ phone: value })
                    }} />
                </CardSection>
                <CardSection>
                    <Input label='CNP' type={'numeric'} value={this.state.cnp} onChangeText={(value) => {
                        this.setState({ cnp: value })
                    }} />
                </CardSection>
                <CardSection>
                    <Input label='Numar Registru' type={'numeric'} value={this.state.registru} onChangeText={(value) => {
                        this.setState({ registru: value })
                    }} />
                </CardSection>
                <CardSection>
                    <Input label='Serie' type={'numeric'} value={this.state.serie} onChangeText={(value) => {
                        this.setState({ serie: value })
                    }} />
                </CardSection>
                {this.renderError()}
                <CardSection>{this.renderButton()}</CardSection>
            </Card>
        );
    }
}
mapStateToProps = (state) => {
    const { loading, error, success } = state.students;
    return { loading, error, success };
}
export default connect(mapStateToProps, { studentInfoUpdate, studentCreate })(AddStudent);