import React from 'react';
import _ from 'lodash';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { ListItem, Header, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { Confirm } from '../../common';
import {setToActive,studentToActiveModalShow} from '../../../actions/index'

class InStudentsHome extends React.Component {
    static navigationOptions = {
        title: 'Elevi Inactivi',
        titleStyle:{
            color:'white',
            fontColor:'white'
        }
    };
    constructor() {
        super();
        this.state = {
            currentStudent: {},
        }
    }
    render() {
        return (
            <ScrollView>
                <Header
                    backgroundColor={'#1E6EC7'}
                    placement="left"
                    centerComponent={{ text: 'Lista Elevilor Inactivi', style: { color: '#fff', fontWeight: 'bold', fontSize: 22 } }}
                />
                <FlatList
                    extraData={[this.state, this.props]}
                    data={this.props.students}
                    renderItem={({ item }) => {
                        return <ListItem
                            rightIcon={<Icon
                                name='sync'
                                color='#1E6EC7'
                                size={42}
                                onPress={() => {
                                    this.setState({ currentStudent: item })
                                    this.props.studentToActiveModalShow();
                                }}
                            />}
                            title={`${item.nume}`}
                        />
                    }}
                />
                <Confirm
                visible={this.props.isSetToActiveModalVisible}
                onAccept={()=>{
                    this.props.setToActive(this.state.currentStudent)
                }}
                onDecline={()=>this.props.studentToActiveModalShow()}
                loading={this.props.setToActiveLoading}
                >
                    Doriti sa reintroduceti elevul in lista elevilor activi?
                </Confirm>
            </ScrollView>
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
    const students = _.map(state.inactiveStudents, (val, uid) => {
        return { ...val };

    });
    students.sort(compare)
    const { setToActiveLoading, isSetToActiveModalVisible } = state.students
    return { students, setToActiveLoading, isSetToActiveModalVisible }
}
export default connect(mapStateToProps, {studentToActiveModalShow,setToActive})(InStudentsHome);