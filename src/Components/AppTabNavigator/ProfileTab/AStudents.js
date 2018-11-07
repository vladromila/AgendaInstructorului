import React from 'react';
import _ from 'lodash';
import { ActivityIndicator, View, Text, FlatList, LayoutAnimation } from 'react-native';
import { AStudentsFetch, studentRestore } from '../../../actions/index';
import { connect } from 'react-redux';
import { ListItem, Icon } from 'react-native-elements';
import { Item, InputGroup } from 'native-base';
import { CardSection, Confirm } from '../../common';

class AStudents extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Lista elevilor admisi",
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
            months: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
            students: [],
            loading: false,
            isRestoreModalVisible: false,
            selStud: {}
        }
    }
    componentWillMount() {
        this.props.AStudentsFetch();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.loading === true)
            this.setState({ isRestoreModalVisible: false })

        this.setState({ students: nextProps.AStudents, loading: false })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.loading === true ?
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        padding: 10
                    }}>
                        <ActivityIndicator size={'large'} color={'#1E6EC7'} style={{ alignSelf: 'center' }} />
                    </View>
                    : <FlatList
                        data={this.state.students}
                        extraData={this.state}
                        renderItem={({ item }) => {
                            return <View><ListItem
                                rightIcon={<Icon
                                    name='sync'
                                    color='#1E6EC7'
                                    size={42}
                                    onPress={() => {
                                        this.setState({ selStud: item, isRestoreModalVisible: true })
                                    }}
                                />}
                                underlayColor='white'
                                containerStyle={{ backgroundColor: 'white' }}
                                title={item.nume}
                                subtitle={`Admis/a pe: ${item.day} ${this.state.months[item.month]} ${item.year}`}
                                onPress={() => {
                                    if (this.state.selectedStudent === item.uid)
                                        this.setState({ selectedStudent: null })
                                    else
                                        this.setState({ selectedStudent: item.uid })
                                    LayoutAnimation.spring();
                                }}
                            />
                                {this.state.selectedStudent === item.uid ?
                                    <View>
                                        <CardSection><Text>Numele Politistului Examinator: <Text style={{ fontWeight: 'bold' }}>{item.numePolitisti}</Text></Text></CardSection>
                                        <CardSection><Text>Data Examinarii: <Text style={{ fontWeight: 'bold' }}>{item.day} {this.state.months[item.month]} {item.year}</Text></Text></CardSection>
                                        <CardSection><Text>CNP: <Text style={{ fontWeight: 'bold' }}>{item.cnp}</Text></Text></CardSection>
                                        <CardSection><Text>Registru: <Text style={{ fontWeight: 'bold' }}>{item.registru}</Text></Text></CardSection>
                                        <CardSection><Text>Serie: <Text style={{ fontWeight: 'bold' }}>{item.serie}</Text></Text></CardSection>
                                        <CardSection><Text>Numar de examene: <Text style={{ fontWeight: 'bold' }}>{item.nre}</Text></Text></CardSection>
                                    </View> : null}
                            </View>
                        }}
                    />}
                <Confirm
                    visible={this.state.isRestoreModalVisible}
                    onAccept={() => {
                        const { cnp, doneClasses, extraClasses, nume, phone, registru, serie, uid, nre, nrs, nrn } = this.state.selStud
                        this.props.studentRestore({ cnp, doneClasses, extraClasses, nume, phone, registru, serie, uid, nre, nrs, nrn })
                    }}
                    onDecline={() => {
                        this.setState({ isRestoreModalVisible: false })
                    }}
                >
                    Vrei sa il repui xd
                </Confirm>
            </View>
        )
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
    const AStudents = _.map(state.AStudents, (val, uid) => {
        return { ...val, uid };
    })
    const { loading } = state.students;
    AStudents.sort(compare);
    return { AStudents, loading };
}

export default connect(mapStateToProps, { AStudentsFetch, studentRestore })(AStudents)