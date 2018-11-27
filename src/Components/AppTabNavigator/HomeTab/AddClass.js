import React from 'react';
import _ from 'lodash'
import { Text, Picker, FlatList, View, ScrollView, Modal, Alert } from 'react-native';
import { Card, CardSection, Button, Input, Spinner } from '../../common/index';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { classInfoUpdate, classCreate } from '../../../actions/index';
import { List, ListItem, SearchBar } from 'react-native-elements'
import { connect } from 'react-redux';
class AddClass extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Creeaza o sedinta",
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
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            id: null,
            showSearchList: true,
            selectType: 'class',
            studentUid: null,
            selectedName: null,
            data: [],
            year: null,
            month: null,
            day: null,
            hour: null,
            minutes: null,
            tip: props.navigation.state.params.defaultPicker || 'normala',
            isModalVisible: true,
            isDateTimePickerVisible1: false,
            isDateTimePickerVisible2: false,
            nat: false,
            examedStudents: [],
            months: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie']
        }
    }
    componentWillMount() {
        this.setState({ data: this.props.navigation.state.params.students })
        if (this.props.navigation.state.params.year) {
            this.setState({ minutes: this.props.navigation.state.params.minutes })
            this.setState({ hour: this.props.navigation.state.params.hour })
            this.setState({ year: this.props.navigation.state.params.year })
            this.setState({ month: this.props.navigation.state.params.month })
            this.setState({ day: this.props.navigation.state.params.day })
            this.setState({ selectType: this.props.navigation.state.params.selectType })
            this.setState({ tip: this.props.navigation.state.params.defaultPicker })
            this.setState({ id: this.props.navigation.state.params.id })
        }
    }
    componentDidUpdate() {
        if (this.props.success === true)
            this.props.navigation.goBack();
    }
    searchFilterFunction = (text) => {
        let search = text.toLowerCase()
        let students = this.props.navigation.state.params.students
        let filteredName = students.filter((item) => {
            return item.nume.toLowerCase().match(search)
        })
        this.setState({ data: filteredName })
    }
    renderButton = () => {
        const { year, month, day, hour, minutes, studentUid, tip, examedStudents, id, location } = this.state;
        if (this.props.loading)
            return <Spinner size='large' />
        else
            return <Button onPress={() => this.props.classCreate({
                year, month, day, hour, minutes, studentUid, tip, examedStudents, id, location
            })}>{this.state.tip === 'examen' ? 'Creeaza Examen' : 'Creeaza Sedinta'}</Button>
    }
    renderError() {
        if (this.state.error)
            return <CardSection><Text>{this.props.error}</Text> </CardSection>
    }
    renderPickers() {
        let pickers = []
        if (this.props.navigation.state.params.selectType === undefined || this.props.navigation.state.params.selectType === null) {
            pickers.push(<Picker.Item key='1' label="Sedinta de scolarizare" value='normala' />)
            pickers.push(<Picker.Item key='2' label="Sedinta de perfectioanare" value='suplimentara' />)
            pickers.push(<Picker.Item key='3' label="Examen" value="examen" />)
        }
        else {
            if (this.props.navigation.state.params.selectType === 'examOnly')
                pickers.push(<Picker.Item key='1' label="Examen" value="examen" />)
            else {
                pickers.push(<Picker.Item key='1' label="Sedinta de scolarizare" value='normala' />)
                pickers.push(<Picker.Item key='2' label="Sedinta de perfectioanare" value='suplimentara' />)
            }
        }
        return pickers;
    }
    render() {
        let date;
        if (this.state.year)
            date = new Date(this.state.year, this.state.month, this.state.day, this.state.hour, this.state.minutes);
        else
            date = new Date();
        let minutes
        if (this.state.minutes < 10)
            minutes = `0${this.state.minutes}`
        else
            minutes = this.state.minutes;
        return (
            <ScrollView>

                <Card>
                    {this.props.navigation.state.params.selectType !== 'examOnly' ? <CardSection>
                        <Input
                            value={this.state.location}
                            onChangeText={(text) => this.setState({ location: text })}
                            label='Locatie'
                        />
                    </CardSection> : null}
                    {this.props.navigation.state.params.selectType === 'examOnly' || this.state.nat === true ? null :
                        <View>
                            <CardSection style={{ borderBottomWidth: 0, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 21, fontWeight: 'bold' }}>Tip</Text>
                            </CardSection>

                            <CardSection style={{ justifyContent: 'center' }}>
                                <Picker
                                    selectedValue={this.state.tip}
                                    style={{ height: 50, width: 300, justifyContent: 'center' }}
                                    onValueChange={(tip) => this.setState({ tip: tip, examedStudents: [] })}>
                                    {this.renderPickers()}
                                </Picker>
                            </CardSection></View>}
                    {this.state.showSearchList === true ?
                        <View>
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
                                                    let ok = 1;
                                                    let id = 0;
                                                    for (let i = 0; i < this.state.examedStudents.length; i++)
                                                        if (item.uid === this.state.examedStudents[i].uid) {
                                                            {
                                                                ok = 0;
                                                                id = i;
                                                            }
                                                        }
                                                    if (ok === 1) {
                                                        let examedStudents = this.state.examedStudents;
                                                        const { uid, nume } = item;
                                                        examedStudents.push({ uid, nume, progress: 'pending', nre: item.nre });
                                                        this.setState({ examedStudents: examedStudents })
                                                    }
                                                    else {
                                                        let examedStudents = this.state.examedStudents;
                                                        _.pullAt(examedStudents, id)
                                                        this.setState({ examedStudents: examedStudents })
                                                    }

                                                    if (this.state.studentUid !== item.uid) {
                                                        this.setState({ studentUid: item.uid, selectedName: item.nume })
                                                        if (item.nrn === 15 && this.state.tip !== 'examen') {
                                                            this.setState({ nat: true, tip: 'suplimentara' })
                                                        }
                                                    }
                                                    else {
                                                        this.setState({
                                                            studentUid: null,
                                                            selectedName: '',
                                                            nat: false,
                                                            tip:'normala'
                                                        }) 
                                                    
                                                    }
                                                   
                                                }}
                                            />
                                        </View>
                                    }}
                                />
                            </List>
                            <CardSection><Button onPress={() => this.setState({ showSearchList: false })}>Ok</Button></CardSection></View> : null}
                    {this.state.year === null ?
                        <View>
                            <CardSection style={{ borderBottomWidth: 0, justifyContent: 'center' }}><Text style={{ fontSize: 19 }}>Selecteaza data: <Text style={{ fontWeight: 'bold' }}>{this.state.day} {this.state.months[this.state.month]} {this.state.year}</Text></Text></CardSection>
                            <CardSection><Button onPress={() => this.setState({ isDateTimePickerVisible1: true })}>Selecteaza o data</Button></CardSection>
                            <DateTimePicker
                                date={date}
                                mode='date'
                                isVisible={this.state.isDateTimePickerVisible1}
                                onConfirm={(date) => {
                                    this.setState({ year: date.getFullYear() })
                                    this.setState({ month: date.getMonth() })
                                    this.setState({ day: date.getDate() })
                                    this.setState({ isDateTimePickerVisible1: false })
                                }}
                                onCancel={() => this.setState({ isDateTimePickerVisible1: false })}
                            /></View> : null}
                    {this.props.navigation.state.params.selectType === 'examOnly' ? null :
                        <View>
                            <CardSection style={{ borderBottomWidth: 0, justifyContent: 'center' }}><Text style={{ fontSize: 19 }}>Selecteaza o ora: {this.state.hour !== null && this.state.minutes != null ? <Text style={{ fontWeight: 'bold' }}>{this.state.hour}:{minutes} </Text> : null}</Text></CardSection>
                            <CardSection><Button onPress={() => this.setState({ isDateTimePickerVisible2: true })}>Adauga ora</Button></CardSection>
                            <DateTimePicker
                                date={date}
                                mode='time'
                                isVisible={this.state.isDateTimePickerVisible2}
                                onConfirm={(date) => {
                                    this.setState({ hour: date.getHours() })
                                    this.setState({ minutes: date.getMinutes() })
                                    this.setState({ isDateTimePickerVisible2: false })
                                }}
                                onCancel={() => this.setState({ isDateTimePickerVisible2: false })}
                            />
                        </View>}

                    <CardSection style={{ borderBottomWidth: 0, justifyContent: 'center' }}>
                        {this.state.tip === 'examen' ? <Text style={{ fontSize: 19 }}>Lista Elevilor:</Text> : <Text style={{ fontSize: 19 }}>Elev: <Text style={{ fontWeight: 'bold' }}>{this.state.selectedName}</Text></Text>}
                    </CardSection>

                    {this.state.tip === 'examen' ?
                        <List containerStyle={{ marginTop: 0 }}>
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
                </Card>
            </ScrollView>
        );
    }
}
mapStateToProps = (state) => {
    const { loading, error, success } = state.classInfo;
    return { loading, error, success };
}
export default connect(mapStateToProps, { classInfoUpdate, classCreate })(AddClass);