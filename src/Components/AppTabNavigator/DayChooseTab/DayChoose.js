import React, { Component } from "react";
import _ from 'lodash';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    NativeModules,
    LayoutAnimation,
    ScrollView,
    Vibration,
    Modal,
    Switch
} from "react-native";
import { Button, Header, List, ListItem } from 'react-native-elements';
import { Icon, Container, Item } from 'native-base'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { fetchClasses, fetchStudents, classDelete, classDeleteModalShowUp1, classDeleteWithoutCount, classSecondDeleteModalShowUp1, classShowSecondModal1, deleteExam, deleteExamTotal, showExamDeleteModal2 } from '../../../actions/index';
import { connect } from 'react-redux';
import { CardSection, Card, Confirm, Input } from '../../common/index'
import Icon1 from 'react-native-vector-icons/FontAwesome'
const { UIManager } = NativeModules
UIManager.setLayoutAnimationEnabledExperimental
    && UIManager.setLayoutAnimationEnabledExperimental(true)

class AddMediaTab extends Component {
    constructor() {
        super();
        this.state = {
            item: {},
            isExamModalVsibleForConfirm: false,
            selectedExamForUpdate: null,
            numePolitist: '',
            selectedExamUid: null,
            selectedFinalExamUid: null,
            currentClass: {},
            currentStudent: {},
            selectedUid: null,
            isDateTimePickerVisible: false,
            calificativ: null,
            year: null,
            month: null,
            day: null,
            refre: false,
            exams: [],
            months: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
            progress: false,
            isExamModalVsible: false,
            selectedExam: {},
            classesSchedule: [
                { hour: 8, minutes: 0 },
                { hour: 9, minutes: 30 },
                { hour: 11, minutes: 0 },
                { hour: 12, minutes: 30 },
                { hour: 14, minutes: 0 },
                { hour: 15, minutes: 30 },
                { hour: 17, minutes: 0 },
                { hour: 18, minutes: 30 },
                { hour: 20, minutes: 0 }
            ],
            limit: [
                { maxim: 31 },
                { maxim: 28 },
                { maxim: 31 },
                { maxim: 30 },
                { maxim: 31 },
                { maxim: 30 },
                { maxim: 31 },
                { maxim: 31 },
                { maxim: 30 },
                { maxim: 31 },
                { maxim: 30 },
                { maxim: 31 },
            ]

        }
    }
    static navigationOptions = {

        header: null
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.success === true) {
            this.setState({ selectedFinalExamUid: null })
        }
        nextProps.exams.forEach(exam => {
            if (this.state.selectedExamForUpdate === exam.uid) {
                this.setState({ selectedExam: exam })
            }
        })
        this.setState({ exams: nextProps.exams })
        this.setState({ refresh: true })
    }
    renderExamedStudents(students) {
        let renderedStudents = students.map((student, i) => {
            return <View key={i}><CardSection><Text>Nume: {student.nume}</Text></CardSection></View>
        })
        return renderedStudents;
    }
    checkValue(students) {
        let ok = true;
        students.forEach(student => {
            if (student.progress === 'pending')
                ok = false;
        })
        if (ok === true)
            return true
        else
            return false
    }
    render() {
        let date;
        if (this.state.year != null)
            date = new Date(this.state.year, this.state.month, this.state.day);
        else
            date = new Date();
        return (
            <Container>
                <Header
                    backgroundColor={'#1E6EC7'}
                    placement="left"
                    centerComponent={{ text: 'Program', style: { color: '#fff', fontWeight: 'bold', fontSize: 22 } }}
                />
                <ScrollView>
                    <List containerStyle={{ marginTop: 0,borderTopWidth:0 }}>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                            <Icon1 name='arrow-left' color='#1E6EC7' size={26} onPress={() => {
                                if (this.state.year !== null) {
                                    if (this.state.day === 1) {
                                        this.setState({ day: this.state.limit[this.state.month - 1].maxim })
                                        this.setState({ month: this.state.month - 1 })
                                    }
                                    else
                                        this.setState({ day: this.state.day - 1 })
                                }
                            }} />
                            <Button
                                icon={{ name: 'calendar', type: 'font-awesome' }}
                                backgroundColor={'#1E6EC7'}
                                title={this.state.year !== null
                                    && this.state.month !== null
                                    && this.state.day !== null ?
                                    `${this.state.day} ${this.state.months[this.state.month]} ${this.state.year}` :
                                    'Alege o data'}
                                onPress={() => this.setState({ isDateTimePickerVisible: !this.state.isDateTimePickerVisible })}
                            />
                            <Icon1 name='arrow-right' color='#1E6EC7' size={26} onPress={() => {
                                if (this.state.year !== null) {
                                    if (this.state.day === this.state.limit[this.state.month].maxim) {
                                        this.setState({ day: 1 })
                                        this.setState({ month: this.state.month + 1 })
                                    }
                                    else
                                        this.setState({ day: this.state.day + 1 })
                                }
                            }} />
                        </View>
                        <FlatList
                            data={[{ title: 'Nici-un examen este programat' }]}
                            keyExtractor={(item, index) => `${index}`}
                            extraData={this.state}
                            renderItem={({ item }) => {
                                if (this.state.year !== null) {
                                    let wantedExam = null;
                                    this.props.exams.forEach(exam => {
                                        if (this.state.day === exam.day && this.state.month === exam.month && this.state.year === exam.year)
                                            wantedExam = exam;
                                    })
                                    if (wantedExam !== null) {
                                        return <View><ListItem
                                            underlayColor='orange'
                                            containerStyle={{ height: 75, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center' }}
                                            titleStyle={{ fontSize: 27, color: 'black' }}
                                            leftIcon={
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Icon1 name="list-alt" size={30} style={{ paddingRight: 10, color: 'black', paddingTop: 5 }} onPress={() => {
                                                        this.setState({ selectedExamForUpdate: wantedExam.uid })
                                                        this.setState({ selectedExam: wantedExam })
                                                        this.setState({ isExamModalVsible: true })
                                                    }} />
                                                    <Icon1 name="edit" size={30} style={{ paddingRight: 10, color: 'black', paddingTop: 5 }} onPress={() => {
                                                        wantedExam.showThird = true;
                                                        this.props.navigation.navigate('EditClass', wantedExam);
                                                    }} />
                                                </View>
                                            }
                                            rightIcon={
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    {this.checkValue(wantedExam.examedStudents) === true ?
                                                        <Icon1 name="times" size={40} style={{ paddingRight: 10, color: 'black' }} onPress={() => {
                                                            this.setState({ selectedExam: wantedExam })
                                                            this.props.showExamDeleteModal2();
                                                        }} />
                                                        : null}
                                                    {this.state.selectedExamUid === wantedExam.uid ? <Icon name="md-arrow-dropdown" style={{ paddingTop: 4 }} /> : <Icon name="md-arrow-dropright" style={{ paddingTop: 4 }} />}
                                                </View>
                                            }
                                            onPress={() => {
                                                LayoutAnimation.spring()
                                                if (this.state.selectedExamUid === wantedExam.uid)
                                                    this.setState({ selectedExamUid: null })
                                                else
                                                    this.setState({ selectedExamUid: wantedExam.uid })
                                            }}
                                            title="Examen"
                                        />
                                            {this.state.selectedExamUid === wantedExam.uid ?
                                                this.renderExamedStudents(wantedExam.examedStudents)
                                                : null}
                                        </View>
                                    }
                                    else
                                        return <ListItem
                                            containerStyle={{ backgroundColor: 'yellow' }}
                                            title={item.title}
                                            rightIcon={<Icon1 name='plus' color='black' size={30}
                                                onPress={() => {
                                                    const { students } = this.props;
                                                    const { year, month, day } = this.state
                                                    this.props.navigation.navigate('AddClass', { students, year, month, day, selectType: 'examOnly', defaultPicker: 'examen' })
                                                }} />}
                                        />

                                }
                            }}
                        />
                        <Confirm
                            visible={this.props.isExamDeleteModalVisible2}
                            onDecline={() => this.props.showExamDeleteModal2()}
                            onAccept={() => {
                                const { uid } = this.state.selectedExam;
                                this.props.deleteExamTotal(uid);
                            }}
                            loading={this.props.deleteExamTotalLoading}
                        >
                            Toti elevii care au fost examinati in aceasta zi au primit un calificativ. Doriti sa stergeti acest examen?
                    </Confirm>
                        <FlatList
                            data={this.state.classesSchedule}
                            keyExtractor={(item, index) => `${index}`}
                            extraData={this.state}
                            renderItem={({ item, index }) => {
                                let minutes
                                if (item.minutes < 10)
                                    minutes = `0${item.minutes}`
                                else
                                    minutes = item.minutes;
                                if (this.state.year !== null) {
                                    let wantedClass = {}
                                    this.props.classes.forEach(cClass => {
                                        if (this.state.year === cClass.year && this.state.month == cClass.month && this.state.day === cClass.day) {
                                            if (cClass.hour === item.hour && cClass.minutes === item.minutes)
                                                wantedClass = cClass;
                                            else
                                                if (index == cClass.id)
                                                    wantedClass = cClass;
                                        }
                                    });
                                    let subtit;
                                    if (wantedClass.tip === 'normala')
                                        subtit = 'Ora de scolarizare';
                                    else
                                        if (wantedClass.tip === 'suplimentara')
                                            subtit = 'Sedinta Suplimentara';
                                        else {
                                            wantedClass.showThird = false;
                                            subtit = 'Examen';
                                        }
                                    if (wantedClass.hour !== undefined) {
                                        let minutes
                                        if (wantedClass.minutes < 10)
                                            minutes = `0${wantedClass.minutes}`
                                        else
                                            minutes = wantedClass.minutes;
                                        let wantedStudent = null
                                        if (this.props.students !== []) {
                                            this.props.students.forEach(student => {
                                                if (student.uid === wantedClass.studentUid)
                                                    wantedStudent = student;
                                            });
                                            if (wantedStudent !== null)

                                                return <View><ListItem containerStyle={{ backgroundColor: 'red' }}
                                                    underlayColor={'red'}
                                                    titleStyle={{ color: 'white', fontWeight: 'bold', fontSize: 19 }}
                                                    leftIcon={
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                            <Icon1 name="times" size={40} style={{ paddingRight: 10, color: 'white' }} onPress={() => {
                                                                this.setState({ currentStudent: wantedStudent })
                                                                this.setState({ currentClass: wantedClass })
                                                                this.props.classDeleteModalShowUp1()
                                                            }} />
                                                            <Icon1 name="edit" size={35} style={{ paddingRight: 10, color: 'white' }} onPress={() => {
                                                                this.props.navigation.navigate('EditClass', wantedClass);
                                                            }} />
                                                        </View>}
                                                    onPress={() => {
                                                        LayoutAnimation.spring()
                                                        if (this.state.selectedUid !== wantedClass.uid)
                                                            this.setState({ selectedUid: wantedClass.uid })
                                                        else
                                                            this.setState({ selectedUid: null })
                                                    }}
                                                    title={`${wantedClass.hour}:${minutes}: ${wantedStudent.nume}`}
                                                    subtitle={<View style={{ alignContent: 'center' }}>{wantedClass.location !== '' && wantedClass.location !== undefined ? <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Locatie: {wantedClass.location}</Text> : <Text></Text>}
                                                        <Text style={{ color: 'white' }}>{subtit}</Text>
                                                    </View>}
                                                    subtitleStyle={{ color: 'white' }}
                                                    rightIcon={this.state.selectedUid === wantedClass.uid ? <Icon name="md-arrow-dropdown" /> : <Icon name="md-arrow-dropright" />}
                                                />
                                                    {this.state.selectedUid === wantedClass.uid ?
                                                        <View>
                                                            {wantedClass.location !== undefined && wantedClass.location !== '' ?
                                                                <View>
                                                                    <CardSection><Text style={{ fontWeight: 'bold', fontSize: 17 }}>Locatie:</Text></CardSection>
                                                                    <CardSection><Text>{wantedClass.location}</Text></CardSection></View> : null}
                                                            <CardSection><Text style={{ fontWeight: 'bold', fontSize: 17 }}>Numarul de sedinte:</Text></CardSection>
                                                            <CardSection><Text>Nuamarul total de sedinte completate: <Text style={{ fontWeight: 'bold' }}>{wantedStudent.nrn + wantedStudent.nrs}</Text></Text></CardSection>
                                                            <CardSection><Text>Numarul de sedinte de scolarizare completate: <Text style={{ fontWeight: 'bold' }}>{wantedStudent.nrn}</Text></Text></CardSection>
                                                            <CardSection><Text>Numarul de sedinte suplimentare completate: <Text style={{ fontWeight: 'bold' }}>{wantedStudent.nrs}</Text></Text></CardSection>
                                                            <CardSection><Text style={{ fontWeight: 'bold', fontSize: 17 }}>Informatii despre elev:</Text></CardSection>
                                                            <CardSection><Text>Nume: <Text style={{ fontWeight: 'bold' }}>{wantedStudent.nume}</Text></Text></CardSection>
                                                            <CardSection><Text>Numar de Telefon: <Text style={{ fontWeight: 'bold' }}>{wantedStudent.phone}</Text></Text></CardSection>
                                                            <CardSection><Text>CNP: <Text style={{ fontWeight: 'bold' }}>{wantedStudent.cnp}</Text></Text></CardSection>
                                                            <CardSection><Text>Numar Registru: <Text style={{ fontWeight: 'bold' }}>{wantedStudent.registru}</Text></Text></CardSection>
                                                            <CardSection><Text>Serie: <Text style={{ fontWeight: 'bold' }}>{wantedStudent.serie}</Text></Text></CardSection></View>
                                                        : null}

                                                </View>
                                        }
                                    }
                                    else
                                        return <ListItem title={<Text style={{ paddingLeft: 35, color: 'white', fontWeight: 'bold', fontSize: 18 }}>{item.hour}:{minutes}</Text>}
                                            titleStyle={{ color: 'white', fontWeight: 'bold' }}
                                            containerStyle={{ backgroundColor: 'green' }}
                                            rightIcon={<Icon1 name='plus' color='white' size={30}
                                                onPress={() => {
                                                    const { students } = this.props;
                                                    const { hour, minutes } = item;
                                                    const { year, month, day } = this.state
                                                    this.props.navigation.navigate('AddClass', { students, hour, minutes, year, month, day, selectType: 'class', defaultPicker: 'normala', id: index })
                                                }} />} />
                                }
                            }
                            }
                        />
                    </List>
                </ScrollView>
                <DateTimePicker
                    date={date}
                    mode='date'
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={(date) => {
                        let arr = this.state.limit;
                        if (date.getFullYear() % 4 === 0) {
                            arr[1].maxim = 29;
                            this.setState({ limit: arr })
                        }
                        else {
                            arr[1].maxim = 28;
                            this.setState({ limit: arr })
                        }
                        this.setState({ year: date.getFullYear() });
                        this.setState({ month: date.getMonth() });
                        this.setState({ day: date.getDate() })
                        this.setState({ isDateTimePickerVisible: !this.state.isDateTimePickerVisible })
                    }}
                    onCancel={() => this.setState({ isDateTimePickerVisible: !this.state.isDateTimePickerVisible })}
                />
                <Confirm visible={this.props.isDeleteModalVisible1 || false} onDecline={() => this.props.classDeleteModalShowUp1()} onAccept={() => this.props.classShowSecondModal1()}>
                    Esti sigur ca vrei sa stergi sedinta de pe <Text style={{ fontWeight: 'bold' }}>{this.state.currentClass.day} {this.state.months[this.state.currentClass.month]} {this.state.currentClass.year}</Text> cu <Text style={{ fontWeight: 'bold' }}>{this.state.currentStudent.nume}</Text>?
            </Confirm>
                <Confirm visible={this.props.isDeleteModalVisible12 || false} onDecline={() => {
                    const { uid } = this.state.currentClass;
                    const uids = this.state.currentStudent.uid;
                    const { year, month, day, hour, minutes, studentUid, tip } = this.state.currentClass;
                    this.props.classDeleteWithoutCount({ uid, year, month, day, hour, minutes, studentUid, tip })
                }} onAccept={() => {
                    const { uid } = this.state.currentClass;
                    const uids = this.state.currentStudent.uid;
                    const { year, month, day, hour, minutes, studentUid, tip } = this.state.currentClass;
                    this.props.classDelete({ uid, uids, year, month, day, hour, minutes, studentUid, tip })
                }}
                    loading={this.props.deleteLoading}
                    loadingWithoutCount={this.props.deleteWithoutCountLoading}
                >
                    Doriti ca sedinta cu <Text style={{ fontWeight: 'bold' }}>{this.state.currentStudent.nume}</Text> sa se contorizeze?
            </Confirm>
                <Modal
                    visible={this.state.isExamModalVsible}
                    transparent
                    animationType="slide"
                    onRequestClose={() => { this.setState({ isExamModalVsible: false }) }}
                >
                    <View style={styles.containerStyle}>
                        <View style={{ backgroundColor: 'white', width: '100%' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 23 }}>Examen: <Text style={{ fontWeight: 'bold' }}>{this.state.day} {this.state.months[this.state.month]} {this.state.year}</Text></Text>
                            <Card>
                                <FlatList
                                    extraData={this.state}
                                    data={this.state.selectedExam.examedStudents}
                                    renderItem={({ item, index }) => {
                                        if (item !== undefined) {
                                            return <View><ListItem
                                                containerStyle={item.progress === 'pending' ? {} : item.progress === 'respins' ? { backgroundColor: 'red' } : { backgroundColor: 'green' }}
                                                underlayColor={item.progress === 'pending' ? 'white' : item.progress === 'respins' ? 'red' : 'green'}
                                                title={item.nume}
                                                onPress={() => {
                                                    if (item.progress === 'pending') {
                                                        this.setState({ numePolitist: '', calificativ: null })
                                                        LayoutAnimation.spring()
                                                        if (this.state.selectedFinalExamUid === item.uid)
                                                            this.setState({ selectedFinalExamUid: null })
                                                        else
                                                            this.setState({ selectedFinalExamUid: item.uid })
                                                    }
                                                }}
                                                rightIcon={item.progress === 'respins' || item.progress === 'admis' ? <Icon1 name='check' color='white' size={24} /> : this.state.selectedFinalExamUid === item.uid ? <Icon name="md-arrow-dropdown" /> : <Icon name="md-arrow-dropright" />}
                                            />
                                                {this.state.selectedFinalExamUid === item.uid ?
                                                    <View><CardSection style={{ justifyContent: 'center', borderBottomWidth: 0 }}>
                                                        <Text style={{ fontSize: 21, alignSelf: 'center' }}>Calificativ:</Text>
                                                    </CardSection>
                                                        <CardSection style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                                            <Button
                                                                backgroundColor={this.state.calificativ === 'admis' ? 'green' : 'grey'}
                                                                title={'Admis'}
                                                                onPress={() => this.setState({ calificativ: 'admis' })}
                                                                textStyle={{ color: 'black' }}
                                                            />
                                                            <Button
                                                                backgroundColor={this.state.calificativ === 'respins' ? 'red' : 'grey'}
                                                                title={'Respins'}
                                                                onPress={() => this.setState({ calificativ: 'respins' })}
                                                                textStyle={{ color: 'black' }}
                                                            />
                                                        </CardSection>
                                                        <CardSection>
                                                            <Input
                                                                value={this.state.numePolitist}
                                                                label='Politist'
                                                                onChangeText={(nume) => this.setState({ numePolitist: nume })}
                                                            />
                                                        </CardSection>
                                                        <CardSection style={{ justifyContent: 'center' }}>
                                                            <Button
                                                                backgroundColor={'#1E6EC7'}
                                                                title={'Finalizeaza'}
                                                                onPress={() => {
                                                                    this.setState({ item: item, index: index, isExamModalVsibleForConfirm: true })
                                                                }}
                                                            />
                                                        </CardSection>
                                                    </View> : null}
                                            </View>
                                        }
                                    }}
                                />
                            </Card>
                            <CardSection style={{ justifyContent: 'center' }}>
                                <Button
                                    backgroundColor={'#1E6EC7'}
                                    title={'Gata'}
                                    onPress={() => this.setState({ isExamModalVsible: false })}
                                    loading={this.props.loading}
                                />
                            </CardSection>
                            <Confirm
                                visible={this.state.isExamModalVsibleForConfirm}
                                onAccept={() => {
                                    const examuid = this.state.selectedExam.uid;
                                    const { day, month, year } = this.state.selectedExam
                                    const { selectedExam, calificativ, index, numePolitist } = this.state;
                                    const { nume, uid, nre } = this.state.item;
                                    const { students } = this.props;
                                    this.props.deleteExam({ index, examuid, selectedExam, nume, uid, calificativ, nre, numePolitist, day, month, year, students })
                                    this.setState({ isExamModalVsibleForConfirm: false })
                                }}
                                onDecline={() => this.setState({ isExamModalVsibleForConfirm: false })}
                            >
                                Sunteti sigur ca elevul <Text style={{ fontWeight: 'bold' }}>{this.state.item.nume}</Text> a primit calificativul <Text style={{ fontWeight: 'bold' }}>{this.state.calificativ === 'admis' ? 'Admis' : 'Respins'}</Text>{this.state.numePolitist !== '' ? <Text> si a fost examinat de <Text style={{ fontWeight: 'bold' }}>{this.state.numePolitist}?</Text></Text> : '?'}{this.state.calificativ === 'admis' ? <Text> Elevul va fi sters si mutat in lista elevilor admisi prezenta in sectiunea profilului dumneavoastra!</Text> : null}
                            </Confirm>
                        </View>
                    </View>
                </Modal>
            </Container>
        );
    }
}
const styles = {
    cardSectionStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
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

    const exams = _.map(state.exams_fetched, (val, uid) => {
        return { ...val, uid }
    })
    const { deleteExamTotalLoading, isExamDeleteModalVisible2 } = state.exams;
    const { deleteLoading, deleteWithoutCountLoading } = state.classInfo;
    const { loading, success } = state.exams;
    const { isDeleteModalVisible1, isDeleteModalVisible12 } = state.classInfo;

    return { exams, classes, students, isDeleteModalVisible1, isDeleteModalVisible12, loading, success, deleteLoading, deleteWithoutCountLoading, deleteExamTotalLoading, isExamDeleteModalVisible2 };
}
export default connect(mapStateToProps, { fetchClasses, fetchStudents, classDelete, classDeleteModalShowUp1, classDeleteWithoutCount, deleteExam, classSecondDeleteModalShowUp1, classShowSecondModal1, deleteExamTotal, showExamDeleteModal2 })(AddMediaTab)
