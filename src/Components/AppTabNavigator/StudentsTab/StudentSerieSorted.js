import React from 'react';
import _ from 'lodash'
import { Text, FlatList, View, NativeModules, LayoutAnimation, Vibration, ScrollView, TouchableHighlight, Modal } from 'react-native';
import { Card, CardSection, Confirm } from '../../common/index';
import { Icon, Container } from 'native-base'
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { fetchStudents, studentDelete, studentDeleteModalShowUp1, closeModal, studentToInactiveModalShow, setToInactive } from '../../../actions/index';
import { List, ListItem, SearchBar, Header, Button } from "react-native-elements"

const { UIManager } = NativeModules
UIManager.setLayoutAnimationEnabledExperimental
    && UIManager.setLayoutAnimationEnabledExperimental(true)

class StudentsSorted extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedUid: null,
            currentStudent: {},
            isSelectTypeOfDeleteModalVisible: false
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Elevi dupa serie",
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
    componentWillMount(){
        this.setState({ data: this.props.students });
    }
    searchFilterFunction = (text) => {
        let search = text.toLowerCase()
        let students = this.props.students
        let filteredName = students.filter((item) => {
            return item.nume.toLowerCase().match(search)
        })
        this.setState({ data: filteredName })
    }
    render() {
        return (<ScrollView
        style={{
            backgroundColor:'white'
        }}
        >
            <List>
                <FlatList
                    ListHeaderComponent={<SearchBar containerStyle={{ backgroundColor: "white", borderTopColor: 'transparent' }}
                        inputContainerStyle={{ backgroundColor: 'white', borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
                        inputStyle={{ backgroundColor: 'white' }}
                        onChangeText={(text) => this.searchFilterFunction(text)}
                    />}
                    data={this.state.data}
                    renderItem={({ item }) => {
                        let onrn = 0;
                        let onrs = 0;
                        if (item.extraClasses !== undefined) {
                            onrs = Object.keys(item.extraClasses).length || 0;
                        }
                        if (item.doneClasses !== undefined) {
                            onrn = Object.keys(item.doneClasses).length || 0;
                        }
                        return <View>
                            <ListItem
                                onLongPress={() => {
                                    this.setState({ currentStudent: item })
                                    this.props.studentDeleteModalShowUp1()
                                }}
                                leftIcon={
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon1 style={{ paddingRight: 20 }} color='red' size={24} name="times" onPress={() => {
                                            this.setState({ currentStudent: item, isSelectTypeOfDeleteModalVisible: true })
                                        }} />
                                        <Icon1 style={{ paddingRight: 20 }} size={24} name="edit" onPress={() => {
                                            this.props.navigation.navigate('EditStudent', item)
                                        }} />
                                    </View>
                                }
                                title={`${item.nume}`}
                                subtitle={item.phone}
                                onPress={() => {
                                    if (this.state.selectedUid !== item.uid)
                                        this.setState({ selectedUid: item.uid })
                                    else
                                        this.setState({
                                            selectedUid: null
                                        })
                                }}
                                rightIcon={<View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon1 style={{ paddingRight: 10 }} size={28} name="user" onPress={() => this.props.navigation.navigate('StudentProfile', { item, title: item.nume })} />
                                    {this.state.selectedUid === item.uid ?
                                        <Icon style={{ paddingRight: 10 }} name="md-arrow-dropdown" onPress={() => this.setState({ showDescription: !this.state.showDescription })} />
                                        : <Icon style={{ paddingRight: 10 }} name="md-arrow-dropright" onPress={() => this.setState({ showDescription: !this.state.showDescription })} />}
                                </View>
                                }
                            />
                            {this.state.selectedUid === item.uid ?
                                <View>
                                    <CardSection><Text style={{ fontWeight: 'bold', fontSize: 17 }}>Numarul de sedinte:</Text></CardSection>
                                    <CardSection><Text>Nuamarul total de sedinte completate: <Text style={{ fontWeight: 'bold' }}>{onrn + onrs}</Text></Text></CardSection>
                                    <CardSection><Text>Numarul de sedinte de scolarizare completate: <Text style={{ fontWeight: 'bold' }}>{item.nrn}</Text></Text></CardSection>
                                    <CardSection><Text>Numarul de sedinte suplimentare completate: <Text style={{ fontWeight: 'bold' }}>{item.nrs}</Text></Text></CardSection>
                                    <TouchableHighlight onPress={() => {
                                        const { nume, uid } = item
                                        this.props.navigation.navigate('CanceledClasses', { nume, uid, title: nume })
                                    }}><CardSection style={{ justifyContent: 'center' }}><Text style={{ fontWeight: 'bold' }}>Lista sedintelor anulate</Text></CardSection></TouchableHighlight>
                                    <CardSection><Text style={{ fontWeight: 'bold', fontSize: 17 }}>Informatii despre elev:</Text></CardSection>
                                    <CardSection><Text>Nume: <Text style={{ fontWeight: 'bold' }}>{item.nume}</Text></Text></CardSection>
                                    <CardSection><Text>Numar de Telefon: <Text style={{ fontWeight: 'bold' }}>{item.phone}</Text></Text></CardSection>
                                    <CardSection><Text>CNP: <Text style={{ fontWeight: 'bold' }}>{item.cnp}</Text></Text></CardSection>
                                    <CardSection><Text>Numar Registru: <Text style={{ fontWeight: 'bold' }}>{item.registru}</Text></Text></CardSection>
                                    <CardSection><Text>Serie: <Text style={{ fontWeight: 'bold' }}>{item.serie}</Text></Text></CardSection></View>
                                : null}
                        </View>
                    }}
                />
            </List>
            <Modal
                visible={this.state.isSelectTypeOfDeleteModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => { this.setState({ isSelectTypeOfDeleteModalVisible: false }) }}
            >
                <View style={styles.containerStyle}>
                    <CardSection style={styles.cardSectionStyle}>
                        <Text style={styles.textStyle}>Ce doriti sa faceti cu acest elev?</Text>
                    </CardSection>
                    <CardSection style={{ justifyContent: 'center' }}>
                        <Button
                            title='Stergeti'
                            onPress={() => {
                                this.setState({ isSelectTypeOfDeleteModalVisible: false })
                                this.props.studentDeleteModalShowUp1();
                            }}
                            large={true}
                            backgroundColor={'#1E6EC7'}
                        />
                        <Button onPress={() => {
                            this.setState({ isSelectTypeOfDeleteModalVisible: false })
                            this.props.studentToInactiveModalShow()
                        }}
                            title='Setati ca inactiv'
                            large={true}
                            backgroundColor={'#1E6EC7'}
                        />
                    </CardSection>
                </View>
            </Modal>
            <Confirm
                visible={this.props.isSetToInactiveModalVisible}
                onDecline={() => {
                    this.props.studentToInactiveModalShow()
                }}
                onAccept={() => {
                    this.props.setToInactive(this.state.currentStudent)
                }}
                loading={this.props.setToInactiveLoading}
            >
                Sunteti sigur ca vreti sa setati elevul <Text style={{ fontWeight: 'bold' }}>{this.state.currentStudent.nume}</Text> ca fiind inactiv?
</Confirm>
            <Confirm visible={this.props.isModalVisible1} onAccept={() => {
                const { uid } = this.state.currentStudent;
                this.props.studentDelete({ uid })
            }} onDecline={() => {
                this.props.closeModal()
            }}
                loading={this.props.deleteLoading}
            >Sunteti sigur ca vreti sa stergeti elevul/a <Text style={{ fontWeight: 'bold' }}>{this.state.currentStudent.nume}</Text>? A terminat scoala?</Confirm>
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
mapStateToProps = (state) => {
    function compare(a, b) {
        if (a.serie < b.serie)
            return -1;
        if (a.serie > b.serie)
            return 1;
        return 0;
    }
    const students = _.map(state.studentsFetch, (val, uid) => {
        return { ...val, uid };

    });
    students.sort(compare)
    const { isModalVisible1, deleteLoading, isSetToInactiveModalVisible, setToInactiveLoading } = state.students;
    return { students, isModalVisible1, deleteLoading, isSetToInactiveModalVisible, setToInactiveLoading };
}
export default connect(mapStateToProps, { fetchStudents, studentDelete, studentDeleteModalShowUp1, closeModal, studentToInactiveModalShow, setToInactive })(StudentsSorted);