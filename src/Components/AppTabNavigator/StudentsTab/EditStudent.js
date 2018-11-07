import React from 'react';
import { Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from '../../common/index';
import { connect } from 'react-redux';
import { studentUpdate } from '../../../actions/index'

class AddStudent extends React.Component {

    constructor() {
        super()
        this.state = {
            nume: null,
            phone: null,
            cnp: null,
            registru: null,
            serie: null,
            nro: null,
            nre: null,
            doneClasses: null
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Editeaza elevul",
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
    componentWillMount() {

        this.setState({ nume: this.props.navigation.state.params.nume })
        this.setState({ phone: this.props.navigation.state.params.phone })
        this.setState({ cnp: this.props.navigation.state.params.cnp })
        this.setState({ registru: this.props.navigation.state.params.registru })
        this.setState({ serie: this.props.navigation.state.params.serie })
        this.setState({ nrn: this.props.navigation.state.params.nrn })
        this.setState({ nrs: this.props.navigation.state.params.nrs })
        this.setState({ nre: this.props.navigation.state.params.nre})
        this.setState({ doneClasses: this.props.navigation.state.params.doneClasses || [] })
        this.setState({ extraClasses: this.props.navigation.state.params.extraClasses || [] })
    }
    componentDidUpdate() {
        if (this.props.success === true)
            this.props.navigation.goBack();
    }
    renderButton() {
        const { nume, phone, cnp, registru, serie, nrn, nrs, nre, doneClasses, extraClasses } = this.state;
        const { uid } = this.props.navigation.state.params
        if (this.props.loading == true)
            return <Spinner size='large' />
        else
            return <Button onPress={() => {
                this.props.studentUpdate({ nume, phone, cnp, registru, serie, nrn, nrs, nre, uid, doneClasses, extraClasses })
            }}>Editeaza Elevul</Button>
    }
    renderError() {
        return <Text>{this.props.error}</Text>
    }
    render() {
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
export default connect(mapStateToProps, { studentUpdate })(AddStudent);