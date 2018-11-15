import React from 'react';
import _ from 'lodash';
import { View, Text, FlatList, ScrollView, Modal, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux'
import { Card, CardSection, Confirm, Input } from '../../common/index';
import { ListItem, Header, Button } from 'react-native-elements';
import Icon1 from 'react-native-vector-icons/FontAwesome'
import { Icon } from 'native-base'
import { deleteExam, deleteExamTotal, showExamDeleteModal3 } from '../../../actions/index'

class ExamList extends React.Component {

    constructor() {
        super()
        this.state = {
            selExam: null,
            months: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
            selectedExam: {},
            wantedExam: {},
            isExamInfoVisible: false,
            isExamVisibleForConfirm: false,
            item: {},
            selectedFinalExamUid: null,
            selectedExamUid: null,
            numePolitist: '',
            index: null,
        }
    }
    static navigationOptions = () => {
        return {
            header: null
        }
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
                style={{ flex: 1, backgroundColor: 'white' }}
            >
                <Header
                    backgroundColor={'#1E6EC7'}
                    placement="left"
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'Lista urmatoarelor examene', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                />
                <FlatList
                    data={this.props.exams}
                    extraData={this.state}
                    renderItem={({ item }) => {

                        return <View>
                            <ListItem
                            containerStyle={{backgroundColor:'white'}}
                                leftIcon={
                                    <Icon1 name="edit" size={23} style={{ paddingRight: 10, }} onPress={() => {
                                        item.showThird = true;
                                        this.props.navigation.navigate('EditExam', item)
                                    }} />}
                                rightIcon={<View>
                                    {this.checkValue(item.examedStudents) === true ?
                                        <Icon1 name="times" size={40} style={{ paddingRight: 10, color: 'black' }} onPress={() => {
                                            this.setState({ selectedExam: item })
                                            this.props.showExamDeleteModal3();
                                        }} />
                                        : null}
                                    <Icon1 name="list-alt" size={30} style={{ paddingRight: 10, }} onPress={() => {
                                        this.setState({ selectedExamForUpdate: item.uid })
                                        this.setState({ selectedExam: item, isExamInfoVisible: true })
                                    }} />
                                </View>}
                                title={`${item.day} ${this.state.months[item.month]} ${item.year}`}
                                onPress={() => {
                                    if (this.state.selectedExamUid === item.uid)
                                        this.setState({ selectedExamUid: null })
                                    else
                                        this.setState({ selectedExamUid: item.uid })
                                    LayoutAnimation.spring();
                                }}
                            />
                            {this.state.selectedExamUid === item.uid ?
                                this.renderExamedStudents(item.examedStudents)
                                : null}
                        </View>
                    }}
                />
                <Confirm
                    visible={this.props.isExamDeleteModalVisible3}
                    onDecline={() => this.props.showExamDeleteModal3()}
                    onAccept={() => {
                        const { uid } = this.state.selectedExam;
                        this.props.deleteExamTotal(uid);
                    }}
                    loading={this.props.deleteExamTotalLoading}
                >
                    Toti elevii care au fost examinati in aceasta zi au primit un calificativ. Doriti sa stergeti acest examen?
                    </Confirm>
                <Modal
                    visible={this.state.isExamInfoVisible}
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
                                                                    this.setState({ item: item, index: index, isExamVisibleForConfirm: true })
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
                                    onPress={() => this.setState({ isExamInfoVisible: false })}
                                    loading={this.props.loading}
                                />
                            </CardSection>
                            <Confirm
                                visible={this.state.isExamVisibleForConfirm}
                                onAccept={() => {
                                    const examuid = this.state.selectedExam.uid;
                                    const { day, month, year } = this.state.selectedExam
                                    const { selectedExam, calificativ, index, numePolitist } = this.state;
                                    const { nume, uid, nre } = this.state.item;
                                    const { students } = this.props;
                                    this.props.deleteExam({ index, examuid, selectedExam, nume, uid, calificativ, nre, numePolitist, day, month, year, students })
                                    this.setState({ isExamVisibleForConfirm: false })
                                }}
                                onDecline={() => this.setState({ isExamVisibleForConfirm: false })}
                            >
                                Sunteti sigur ca elevul <Text style={{ fontWeight: 'bold' }}>{this.state.item.nume}</Text> a primit calificativul <Text style={{ fontWeight: 'bold' }}>{this.state.calificativ === 'admis' ? 'Admis' : 'Respins'}</Text>{this.state.numePolitist !== '' ? <Text> si a fost examinat de <Text style={{ fontWeight: 'bold' }}>{this.state.numePolitist}?</Text></Text> : '?'}{this.state.calificativ === 'admis' ? <Text> Elevul va fi sters si mutat in lista elevilor admisi prezenta in sectiunea profilului dumneavoastra!</Text> : null}
                            </Confirm>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        )
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
mapStateToProps = state => {
    function compare(a, b) {
        if (a.year < b.year)
            return -1;
        if (a.year > b.year)
            return 1;
        if (a.year === b.year) {
            if (a.month < b.month)
                return -1;
            if (a.month > b.month)
                return 1;
            if (a.month === b.month) {
                if (a.day < b.day)
                    return -1;
                if (a.day > b.day)
                    return 1;
                if (a.day === b.day)
                    return 0;
            }
        }
    }
    const exams = _.map(state.exams_fetched, (val, uid) => {
        return { ...val, uid };

    });
    const students = _.map(state.studentsFetch, (val, uid) => {
        return { ...val, uid };
    });

    const { loading, success } = state.exams;
    exams.sort(compare)
    const { deleteExamTotalLoading, isExamDeleteModalVisible3 } = state.exams
    return { exams, success, loading, students, deleteExamTotalLoading, isExamDeleteModalVisible3 }
}
export default connect(mapStateToProps, { deleteExam, deleteExamTotal, showExamDeleteModal3 })(ExamList);