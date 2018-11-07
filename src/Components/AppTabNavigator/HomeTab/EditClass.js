import React from 'react';
import { Text, Picker, View, FlatList, ScrollView } from 'react-native';
import { Card, CardSection, Button, Input, Spinner } from '../../common/index';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { classUpdate } from '../../../actions/index';
import { List, ListItem, SearchBar } from 'react-native-elements'
import { connect } from 'react-redux';
import _ from 'lodash'
import { InputGroup } from 'native-base';
class EditClass extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Editeaza sedinta/examen",
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
            location: '',
            showSearchList: true,
            id: null,
            data: [],
            examedStudents: [],
            selectedName: '',
            year: null,
            month: null,
            day: null,
            hour: null,
            minutes: null,
            studentUid: null,
            tip: 'normala',
            showThird: true,
            isDateTimePickerVisible1: false,
            isDateTimePickerVisible2: false,
            months: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie']
        }
    }
    componentWillMount() {
        this.setState({ data: this.props.students })
        if (this.props.navigation.state.params.showThird === false)
            this.setState({ showThird: false })
        this.setState({ year: this.props.navigation.state.params.year })
        this.setState({ month: this.props.navigation.state.params.month })
        this.setState({ day: this.props.navigation.state.params.day })
        this.setState({ hour: this.props.navigation.state.params.hour })
        this.setState({ minutes: this.props.navigation.state.params.minutes })
        this.setState({ studentUid: this.props.navigation.state.params.studentUid })
        this.setState({ tip: this.props.navigation.state.params.tip })
        this.setState({ selectedName: this.props.navigation.state.params.numeElev })
        this.setState({ examedStudents: this.props.navigation.state.params.examedStudents })
        this.setState({ id: this.props.navigation.state.params.id })
        this.setState({ location: this.props.navigation.state.params.location })
    }
    componentDidUpdate() {
        if (this.props.success === true) {
            this.props.navigation.goBack();
        }
    }
    searchFilterFunction = (text) => {
        let search = text.toLowerCase()
        let students = this.props.students
        let filteredName = students.filter((item) => {
            return item.nume.toLowerCase().match(search)
        })
        this.setState({ data: filteredName })
    }
    renderTypePickers() {
        let pickers = [<Picker.Item key='1' label="Normala" value='normala' />, <Picker.Item key='2' label="Suplimentara" value='suplimentara' />]
        if (this.state.showThird === false)
            pickers.push(<Picker.Item key='3' label="Examen" value='examen' />)
        return pickers;
    }
    renderButton = () => {
        const { year, month, day, hour, minutes, studentUid, tip, examedStudents, id, location } = this.state;
        const { uid } = this.props.navigation.state.params;
        if (this.props.loading)
            return <Spinner size='large' />
        else
            return <Button onPress={() => this.props.classUpdate({
                year, month, day, hour, minutes, studentUid, uid, tip, examedStudents, id, location
            })}>{this.state.tip === 'examen' ? 'Editeaza Examen' : 'Editeaza Sedinta'}</Button>
    }
    renderError() {
        if (this.state.error)
            return <CardSection><Text>{this.props.error}</Text></CardSection>
    }
    render() {
        let minutes
        if (this.state.minutes < 10)
            minutes = `0${this.state.minutes}`
        else
            minutes = this.state.minutes;
        return (
            <ScrollView>
                <Card>
                    {this.state.tip !== 'examen' ?
                        <View><CardSection>
                            <Input
                                value={this.state.location}
                                onChangeText={(text) => this.setState({ location: text })}
                                label='Locatie'
                            />
                        </CardSection>
                            <CardSection style={{ borderBottomWidth: 0, justifyContent: 'center' }}>
                                <Text>Tipul Sedintei:</Text>
                            </CardSection>
                            <CardSection style={{ justifyContent: 'center' }}>
                                <Picker
                                    selectedValue={this.state.tip}
                                    style={{ height: 50, width: 300, justifyContent: 'center' }}
                                    onValueChange={(tip) => this.setState({ tip: tip })}>
                                    {this.renderTypePickers()}
                                </Picker>
                            </CardSection></View> : null}
                    {this.state.showSearchList === true ? <View>
                        <List containerStyle={{ marginTop: 0 }}>
                            <FlatList
                                ListHeaderComponent={<SearchBar autoFocus={true} containerStyle={{ backgroundColor: "white", borderTopColor: 'transparent' }}
                                    inputContainerStyle={{ backgroundColor: 'white', borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
                                    inputStyle={{ backgroundColor: 'white' }}
                                    onChangeText={(text) => this.searchFilterFunction(text)}
                                />}
                                data={this.state.data}
                                renderItem={({ item }) => {
                                    let ok = 0;
                                    if (this.state.tip === 'examen')
                                        this.state.examedStudents.forEach(student => {
                                            if (student.uid === item.uid)
                                                ok = 1;
                                        })
                                    return <View>
                                        <ListItem
                                            containerStyle={{ backgroundColor: this.state.studentUid === item.uid && (this.state.tip === 'normala' || this.state.tip == 'suplimentara') ? 'green' : ok === 1 && this.state.tip === 'examen' ? 'yellow' : null }}
                                            title={`${item.nume}`}
                                            subtitle={item.phone}
                                            onPress={() => {
                                                if (this.state.tip === 'examen') {
                                                    let ok1 = 1;
                                                    let id = 0;
                                                    for (let i = 0; i < this.state.examedStudents.length; i++)
                                                        if (item.uid === this.state.examedStudents[i].uid) {
                                                            {
                                                                ok1 = 0;
                                                                id = i;
                                                            }
                                                        }

                                                    if (ok1 === 1) {
                                                        let examedStudents = this.state.examedStudents;
                                                        const { uid, nume } = item;
                                                        examedStudents.push({ uid, nume, progress: 'pending', nre: item.nre });
                                                        this.setState({ examedStudents: examedStudents })
                                                    }
                                                    else {
                                                        <Text styl={{ fontWeight: 'bold' }}></Text>
                                                        let examedStudents = this.state.examedStudents;
                                                        _.pullAt(examedStudents, id)
                                                        this.setState({ examedStudents: examedStudents })
                                                    }
                                                }
                                                else {
                                                    if (this.state.studentUid !== item.uid)
                                                        this.setState({ studentUid: item.uid, selectedName: item.nume })
                                                    else
                                                        this.setState({
                                                            studentUid: null,
                                                            selectedName: ''
                                                        })
                                                }
                                            }}
                                        />
                                    </View>
                                }}
                            />
                        </List>
                        <CardSection><Button onPress={() => this.setState({ showSearchList: false })}>Ok</Button></CardSection></View> : null}
                    <CardSection style={{ borderBottomWidth: 0, justifyContent: 'center' }}><Text>Selecteaza data: <Text style={{ fontWeight: 'bold' }}>{this.state.day} {this.state.months[this.state.month]} {this.state.year}</Text></Text></CardSection>
                    <CardSection><Button onPress={() => this.setState({ isDateTimePickerVisible1: true })}>Selecteaza o data</Button></CardSection>
                    <DateTimePicker

                        mode='date'
                        isVisible={this.state.isDateTimePickerVisible1}
                        onConfirm={(date) => {
                            this.setState({ year: date.getFullYear() })
                            this.setState({ month: date.getMonth() })
                            this.setState({ day: date.getDate() })
                            this.setState({ isDateTimePickerVisible1: false })
                        }}
                        onCancel={() => this.setState({ isDateTimePickerVisible1: false })}
                    />
                    {this.state.tip === 'examen' ? null : <View>
                        <CardSection style={{ borderBottomWidth: 0, justifyContent: 'center' }}><Text>Selecteaza o ora: {this.state.hour !== null && this.state.minutes != null ? <Text style={{ fontWeight: 'bold' }}>{this.state.hour}:{minutes} </Text> : null}</Text></CardSection>
                        <CardSection><Button onPress={() => this.setState({ isDateTimePickerVisible2: true })}>addhour</Button></CardSection></View>}
                    <DateTimePicker
                        mode='time'
                        isVisible={this.state.isDateTimePickerVisible2}
                        onConfirm={(date) => {
                            this.setState({ hour: date.getHours() })
                            this.setState({ minutes: date.getMinutes() })
                            this.setState({ isDateTimePickerVisible2: false })
                        }}
                        onCancel={() => this.setState({ isDateTimePickerVisible2: false })}
                    />

                    <CardSection style={{ borderBottomWidth: 0, justifyContent: 'center' }}>
                        <Text>Elev: <Text style={{ fontWeight: 'bold' }}>{this.state.selectedName}</Text></Text>
                    </CardSection>{this.state.tip === 'examen' ?
                        <List style={{ marginTop: 0 }}>
                            <FlatList
                                extraData={this.state}
                                data={this.state.examedStudents}
                                renderItem={({ item }) => {
                                    return <ListItem
                                        title={`${item.nume}`}
                                    />
                                }}
                            />
                        </List> : null}
                    <CardSection><Button onPress={() => {
                        this.searchFilterFunction('');
                        this.setState({ showSearchList: true })
                    }}>Selecteaza Elev</Button></CardSection>

                    {this.renderError()}
                    <CardSection>{this.renderButton()}</CardSection>
                </Card></ScrollView>
        );
    }
}
mapStateToProps = (state) => {
    function compare(a, b) {
        if (a.nume < b.nume)
            return -1;
        if (a.nume > b.nume)
            return 1;
        return 0;
    }
    const students = _.map(state.studentsFetch, (val, uid) => {
        return { ...val, uid };

    });
    students.sort(compare)
    const { loading, error, success } = state.classInfo;
    return { loading, error, success, students };
}
export default connect(mapStateToProps, { classUpdate })(EditClass);