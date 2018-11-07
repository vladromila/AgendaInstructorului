import React, { Component } from "react";
import {
    Text,
    View,
    FlatList,
    NativeModules,
    LayoutAnimation,
    Vibration,
    Modal,
    ScrollView
} from "react-native";
import _ from 'lodash';

import { Icon, Container } from 'native-base';;
import { CardSection, Confirm, Card, Input } from '../../common/index'
import { connect } from 'react-redux';
import { fetchClasses, fetchStudents, deleteExam, classDelete, classDeleteModalShowUp, classShowSecondModal, classSecondDeleteModalShowUp, classDeleteWithoutCount, fetchCanceledClasses, examsFetch, infoFetch, deleteExamTotal, showExamDeleteModal1,inactiveStudentsFetch } from '../../../actions/index';
import { List, ListItem, Header } from "react-native-elements"
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements'
const { UIManager } = NativeModules
UIManager.setLayoutAnimationEnabledExperimental
    && UIManager.setLayoutAnimationEnabledExperimental(true)

class Home extends Component {


    constructor() {
        super();
        this.state = {
            title: '',
            item: {},
            selectedUid: null,
            isExamModalVsible1: false,
            isExamModalVsibleForConfirm1: false,
            isModalVisible1: false,
            currentClass: {},
            currentStudent: {},
            selectedExam: {},
            selectedExamForUpdate: {},
            selectedExamUid: null,
            months: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
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

        }
    }
    componentWillMount() {
        this.props.inactiveStudentsFetch();
        this.props.fetchClasses();
        this.props.fetchStudents();
        this.props.fetchCanceledClasses();
        this.props.examsFetch();
        this.props.infoFetch();
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        if (hour >= 20 && minutes >= 0)
            this.setState({ year: year, month: month, day: day + 1, title: 'Este trecut de ora 9, programul zile de maine este...' })
        else
            this.setState({ year: year, month: month, day: day })

    }
    componentDidUpdate() {
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
        return (
            <ScrollView
            style={{
                backgroundColor:'white'
            }}
            >
                <Header
                    backgroundColor={'#1E6EC7'}
                    placement="left"
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'Programul Zilei', style: { color: '#fff', fontWeight: 'bold', fontSize: 22 } }}
                />
                {this.state.title !== '' ? <Text style={{ alignSelf: 'center' }}>{this.state.title}</Text> : null}
                <List
                 containerStyle={{ marginTop: 0,borderTopWidth:0 }}
                >
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
                                                    this.setState({ isExamModalVsible1: true })
                                                }} />
                                                <Icon1 name="edit" size={30} style={{ paddingRight: 10, color: 'black', paddingTop: 5 }} onPress={() => {
                                                    wantedExam.showThird = true;
                                                    this.props.navigation.navigate('EditClass', wantedExam);
                                                }} />
                                            </View>
                                        }
                                        rightIcon={<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            {this.checkValue(wantedExam.examedStudents) === true ?
                                                <Icon1 name="times" size={40} style={{ paddingRight: 10, color: 'black' }} onPress={() => {
                                                    this.setState({ selectedExam: wantedExam })
                                                    this.props.showExamDeleteModal1();
                                                }} />
                                                : null}
                                            {this.state.selectedExamUid === wantedExam.uid ? <Icon name="md-arrow-dropdown" style={{ paddingTop: 4 }} /> : <Icon name="md-arrow-dropright" style={{ paddingTop: 4 }} />}</View>}
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
                        visible={this.props.isExamDeleteModalVisible1}
                        onDecline={() => this.props.showExamDeleteModal1()}
                        onAccept={() => {
                            const { uid } = this.state.selectedExam;
                            this.props.deleteExamTotal(uid);
                        }}
                        loading={this.props.deleteExamTotalLoading}
                    >
                        Toti elevii care au fost examinati astazi au primit un calificativ. Doriti sa stergeti acest examen?
                    </Confirm>
                    <FlatList
                        data={this.state.classesSchedule}
                        keyExtractor={(item, index) => `${index}`}
                        extraData={[this.props, this.state]}
                        renderItem={({ item, index }) => {
                            let minutes
                            if (item.minutes < 10)
                                minutes = `0${item.minutes}`
                            else
                                minutes = item.minutes;
                            let wantedClass = {}
                            this.props.classes.forEach(cClass => {
                                if (cClass.hour === item.hour && cClass.minutes === item.minutes)
                                    wantedClass = cClass;
                                else
                                    if (index == cClass.id)
                                        wantedClass = cClass;
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
                                                        this.props.classDeleteModalShowUp()
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
                    />
                </List>
                <Confirm visible={this.props.isDeleteModalVisible || false} onDecline={() => this.props.classDeleteModalShowUp()} onAccept={() => {
                    this.props.classShowSecondModal()
                }}>
                    Esti sigur ca vrei sa stergi sedinta de pe <Text style={{ fontWeight: 'bold' }}>{this.state.currentClass.day} {this.state.months[this.state.currentClass.month]} {this.state.currentClass.year}</Text> cu <Text style={{ fontWeight: 'bold' }}>{this.state.currentStudent.nume}</Text>?
            </Confirm>
                <Confirm visible={this.props.isDeleteModalVisible2 || false} onDecline={() => {
                    const { uid } = this.state.currentClass;
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
                    visible={this.state.isExamModalVsible1}
                    transparent
                    animationType="slide"
                    onRequestClose={() => { this.setState({ isExamModalVsible: false }) }}
                >
                    <View style={styles.containerStyle}>
                        <View style={{ backgroundColor: 'white', width: '100%' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 23 }}>Examen: <Text style={{ fontWeight: 'bold' }}>{this.state.day} {this.state.months[this.state.month]} {this.state.year}</Text></Text>
                            <Card>
                                <FlatList
                                    extraData={[this.state, this.props]}
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
                                                                    this.setState({ item: item, index: index, isExamModalVsibleForConfirm1: true })
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
                                    onPress={() => this.setState({ isExamModalVsible1: false })}
                                    loading={this.props.loading}
                                />
                            </CardSection>
                            <Confirm
                                visible={this.state.isExamModalVsibleForConfirm1}
                                onAccept={() => {
                                    const examuid = this.state.selectedExam.uid;
                                    const { day, month, year } = this.state.selectedExam
                                    const { selectedExam, calificativ, index, numePolitist } = this.state;
                                    const { nume, uid, nre } = this.state.item;
                                    const { students } = this.props;
                                    this.props.deleteExam({ index, examuid, selectedExam, nume, uid, calificativ, nre, numePolitist, day, month, year, students })
                                    this.setState({ isExamModalVsibleForConfirm1: false })
                                }}
                                onDecline={() => this.setState({ isExamModalVsibleForConfirm1: false })}
                            >
                                Sunteti sigur ca elevul <Text style={{ fontWeight: 'bold' }}>{this.state.item.nume}</Text> a primit calificativul <Text style={{ fontWeight: 'bold' }}>{this.state.calificativ === 'admis' ? 'Admis' : 'Respins'}</Text>{this.state.numePolitist !== '' ? <Text> si a fost examinat de <Text style={{ fontWeight: 'bold' }}>{this.state.numePolitist}?</Text></Text> : '?'}{this.state.calificativ === 'admis' ? <Text> Elevul va fi sters si mutat in lista elevilor admisi prezenta in sectiunea profilului dumneavoastra!</Text> : null}
                            </Confirm>
                        </View>
                    </View>
                </Modal>
            </ScrollView>



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
    function compareClasses(a, b) {
        if (a.hour < b.hour)
            return -1;
        if (a.hour > b.hour)
            return 1;
        return 0;
    }
    const date = new Date();
    const year1 = date.getFullYear();
    const month1 = date.getMonth();
    let day1 = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    if (hour >= 20 && minutes >= 0)
        day1 = day1 + 1;
    const classes = _.map(state.classes, (val, uid) => {
        const { year, month, day, hour, minutes, studentUid } = val;

        if (year === year1 && month === month1 && day1 === day)
            return { ...val, uid };
        else
            return {}
    });
    const students = _.map(state.studentsFetch, (val, uid) => {
        return { ...val, uid };

    });
    const { isDeleteModalVisible, isDeleteModalVisible2 } = state.classInfo;
    students.sort(compare);
    classes.sort(compareClasses);
    const exams = _.map(state.exams_fetched, (val, uid) => {
        return { ...val, uid };

    });
    const { deleteExamTotalLoading, isExamDeleteModalVisible1 } = state.exams;
    const { deleteLoading, deleteWithoutCountLoading } = state.classInfo;
    const { loading, success } = state.exams;
    return { exams, classes, students, isDeleteModalVisible, isDeleteModalVisible2, loading, success, deleteLoading, deleteWithoutCountLoading, deleteExamTotalLoading, isExamDeleteModalVisible1 };
}
export default connect(mapStateToProps, { fetchClasses, fetchStudents, classDelete, deleteExam, classDeleteModalShowUp, classShowSecondModal, classSecondDeleteModalShowUp, classDeleteWithoutCount, infoFetch, fetchCanceledClasses, examsFetch, deleteExamTotal, showExamDeleteModal1,inactiveStudentsFetch })(Home);
