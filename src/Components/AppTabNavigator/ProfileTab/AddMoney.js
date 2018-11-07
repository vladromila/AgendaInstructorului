import React from 'react';
import _ from 'lodash';
import { Text, Picker, TextInput } from 'react-native';
import { Card, CardSection, Input } from '../../common/index'
import { connect } from 'react-redux'
import Icon1 from 'react-native-vector-icons/FontAwesome'

class AddMoney extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Adauga o plata",
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
    constructor() {
        super();

        this.state = {
            type: 'scolarizare',
            value: 0,
            studentUid: ''
        }
    }
    renderPickers() {
        const items = [];
        this.props.students.forEach((student, i) => {
            items.push(<Picker.Item key={i} label={student.nume} value={student.uid}></Picker.Item>)
        })
        return items;
    }
    render() {
        return (<Card>
            <CardSection style={{ justifyContent: 'center' }}>
                <Text style={{ alignSelf: 'center', fontSize: 21 }}>Plata pentru:</Text>
            </CardSection>
            <CardSection style={{ justifyContent: 'center' }}>
                <Picker
                    onValueChange={(type) => this.setState({ type })}
                    selectedValue={this.state.type}
                    style={{ height: 50, width: 300, justifyContent: 'center', alignSelf: 'center' }}
                >
                    <Picker.Item label='Scolarizare: Rata' value='scolarizare' />
                    <Picker.Item label='Ora Suplimentara' value='suplimentara' />
                    <Picker.Item label='Cheltuieli(motorina etc.)' value='cheltuieli' />
                </Picker>
            </CardSection>
            <CardSection style={{ justifyContent: 'center' }}>
                <Text style={{ alignSelf: 'center', fontSize: 21 }}>Valoare:</Text>
            </CardSection>
            <CardSection style={{ justifyContent: 'center', flexDirection: 'row' }}>
                <Icon1 name='minus' size={30} onPress={() => {
                    if (this.state.value >= 0)
                        this.setState({ value: this.state.value - 1 })
                }} />
                <TextInput
                    keyboardType='numeric'
                    style={{ width: '50%', alignItems: 'center', textAlign: 'center', fontSize: 21,padding:3 }}
                    editable={true}
                    onChangeText={value => this.setState({ value })}
                    value={`${this.state.value}`}
                    textContentType='none'
                    placeholder='Suma primita/cheltuita'
                />
                <Icon1 name='plus' size={30} onPress={() => this.setState({ value: this.state.value + 1 })} />
            </CardSection>
            {this.state.type === 'cheltuieli' ? null :
                <CardSection style={{ justifyContent: 'center' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 21 }}>Valoare:</Text>
                </CardSection>
            }
            {this.state.type === 'cheltuieli' ? null : <CardSection style={{ justifyContent: 'center' }}>
                <Picker
                    onValueChange={(studentUid) => this.setState({ studentUid: studentUid })}
                    selectedValue={this.state.studentUid}
                    style={{ height: 50, width: 300, justifyContent: 'center', alignSelf: 'center' }}
                >
                    <Picker.Item label='Adauga un elev...' value={null} />
                    {this.renderPickers()}
                </Picker>
            </CardSection>}
        </Card>)
    }
}
mapStateToProps = state => {
    const students = _.map(state.studentsFetch, (val, uid) => {
        return { ...val, uid };

    });
    return { students };
}
export default connect(mapStateToProps, {})(AddMoney);