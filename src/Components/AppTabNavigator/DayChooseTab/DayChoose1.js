import React, { Component } from "react";
import _ from 'lodash';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    NativeModules,
    LayoutAnimation
} from "react-native";
import { Button, Header, List, ListItem } from 'react-native-elements';
import { Icon, Container } from 'native-base'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { fetchClasses, fetchStudents, classDelete, classDeleteModalShowUp1 } from '../../../actions/index';
import { connect } from 'react-redux';
import { CardSection, Card, Confirm } from '../../common/index'
import Icon1 from 'react-native-vector-icons/FontAwesome'

const { UIManager } = NativeModules
UIManager.setLayoutAnimationEnabledExperimental
    && UIManager.setLayoutAnimationEnabledExperimental(true)

class AddMediaTab extends Component {
    constructor() {
        super();
        this.state = {
            currentClass: {},
            currentStudent: {},
            selectedUid: null,
            isDateTimePickerVisible: false,
            year: null,
            month: null,
            day: null,
            months: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie']
        }
    }
    static navigationOptions = {

        header: null
    }
    componentWillMount(){
        console.log('rerender')
    }

    render() {
        return (
            <Container>
                <Header
                    backgroundColor={'#1E6EC7'}
                    placement="left"
                    centerComponent={{ text: 'Program', style: { color: '#fff', fontWeight: 'bold', fontSize: 22 } }}
                    rightComponent={<Icon name="ios-add" style={{ color: 'white' }} onPress={() => this.props.navigation.navigate('AddClass', this.props.students)} />}
                />
                <List>
                    <Button
                        icon={{ name: 'calendar', type: 'font-awesome' }}
                        backgroundColor={'#1E6EC7'}
                        title={this.state.year !== null && this.state.month !== null && this.state.day !== null ? `${this.state.day} ${this.state.months[this.state.month]} ${this.state.year}` : 'Alege o data'}
                        onPress={() => this.setState({ isDateTimePickerVisible: !this.state.isDateTimePickerVisible })}
                    />
                    <FlatList
                        data={this.props.classes}
                        keyExtractor={(item, index) => item.uid}
                        extraData={this.state}
                        renderItem={({ item }) => {
                            let wantedEmployee = null
                            if (this.props.students !== []) {
                                this.props.students.forEach(student => {
                                    if (student.uid === item.studentUid)
                                        wantedEmployee = student;
                                });
                                if (item.year === this.state.year && item.month === this.state.month && this.state.day === item.day)
                                    if (wantedEmployee !== null)

                                        return <View><ListItem
                                            leftIcon={<Icon1 name="times" size={18} style={{ paddingRight: 10, color: 'red' }} onPress={() => {
                                                this.setState({ currentStudent: wantedEmployee })
                                                this.setState({ currentClass: item })
                                                this.props.classDeleteModalShowUp1()
                                            }} />}
                                            onPress={() => {

                                                LayoutAnimation.spring();
                                                if (this.state.selectedUid !== item.uid)
                                                    this.setState({ selectedUid: item.uid })
                                                else
                                                    this.setState({ selectedUid: null })
                                            }}
                                            title={`${item.hour}:${item.minutes}: ${wantedEmployee.nume}`}
                                            subtitle={item.year}
                                            rightIcon={this.state.selectedUid === item.uid ? <Icon name="md-arrow-dropdown" /> : <Icon name="md-arrow-dropright" />}
                                        />
                                            {this.state.selectedUid === item.uid ?
                                                <View><CardSection><Text>Nume: <Text style={{ fontWeight: 'bold' }}>{wantedEmployee.nume}</Text></Text></CardSection>
                                                    <CardSection><Text>Numar de Telefon: <Text style={{ fontWeight: 'bold' }}>{wantedEmployee.phone}</Text></Text></CardSection>
                                                    <CardSection><Text>CNP: <Text style={{ fontWeight: 'bold' }}>{wantedEmployee.cnp}</Text></Text></CardSection>
                                                    <CardSection><Text>Numar Registru: <Text style={{ fontWeight: 'bold' }}>{wantedEmployee.registru}</Text></Text></CardSection>
                                                    <CardSection><Text>Serie: <Text style={{ fontWeight: 'bold' }}>{wantedEmployee.serie}</Text></Text></CardSection></View>
                                                : null}

                                        </View>
                            }
                        }
                        }
                    />
                </List>
                <DateTimePicker

                    mode='date'
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={(date) => {
                        this.setState({ year: date.getFullYear() });
                        this.setState({ month: date.getMonth() });
                        this.setState({ day: date.getDate() })
                        this.setState({ isDateTimePickerVisible: !this.state.isDateTimePickerVisible })
                    }}
                    onCancel={() => this.setState({ isDateTimePickerVisible: !this.state.isDateTimePickerVisible })}
                />
                <Confirm visible={this.props.isDeleteModalVisible1 || false} onDecline={() => this.props.classDeleteModalShowUp1()} onAccept={() => {
                    const { uid } = this.state.currentClass;
                    const uids = this.state.currentStudent.uid;

                    this.props.classDelete({ uid, uids })
                }}>
                    Esti sigur ca vrei sa stergi sedinta de pe <Text style={{ fontWeight: 'bold' }}>{this.state.currentClass.day} {this.state.months[this.state.currentClass.month]} {this.state.currentClass.year}</Text> cu <Text style={{ fontWeight: 'bold' }}>{this.state.currentStudent.nume}</Text>?
            </Confirm>
            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    function compare(a, b) {
        if (a.nume < b.nume)
            return -1;
        if (a.nume > b.nume)
            return 1;
        return 0;
    }
    const classes = _.map(state.classes, (val, uid) => {
        return { ...val, uid };
    });
    const students = _.map(state.studentsFetch, (val, uid) => {
        return { ...val, uid };
    });
    students.sort(compare)
    const { isDeleteModalVisible1 } = state.classInfo;
    return { classes, students, isDeleteModalVisible1 };
}
export default connect(mapStateToProps, { fetchClasses, fetchStudents, classDelete, classDeleteModalShowUp1 })(AddMediaTab)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});