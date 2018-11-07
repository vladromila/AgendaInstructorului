import React from 'react';
import _ from 'lodash';
import { ActivityIndicator, View, Text, FlatList, LayoutAnimation } from 'react-native';
import { RStudentsFetch, studentRestore } from '../../../actions/index';
import { connect } from 'react-redux';
import { ListItem, Icon } from 'react-native-elements';
import { Item, InputGroup, List } from 'native-base';
import { CardSection, Confirm } from '../../common';

class AStudents extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Lista elevilor respinsi",
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
            selStud: {}
        }
    }
    componentWillMount() {
        this.props.RStudentsFetch();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ students: nextProps.RStudents })
    }
    renderAttempts(students) {
        const attempts = [];
        students.forEach((student, index) => {
            attempts.push(<ListItem
                key={index}
                subtitle={`Politist examinator: ${student.numePolitist}`}
                title={`${student.day} ${this.state.months[student.month]} ${student.year}`}
                titleStyle={{fontSize:20}}
            />)
        });
        return <View style={{marginLeft:20,paddingLeft:2,borderLeftWidth:2,borderLeftColor:'black'}}>
        <Text>Istoricul incercarilor:</Text>
        {attempts}</View>;
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.students}
                    extraData={[this.state, this.props]}
                    renderItem={({ item }) => {
                        return <View><ListItem
                        titleStyle={{fontSize:23}}
                            title={`${item.name}`}
                            onPress={() => {
                                if (item.uid === this.state.selStud)
                                    this.setState({ selStud: null })
                                else
                                    this.setState({ selStud: item.uid })
                                    LayoutAnimation.spring();
                            }}
                        />
                            {this.state.selStud === item.uid ? this.renderAttempts(item.attempts) : null}
                        </View>
                    }}
                />
            </View>
        )
    }
}
mapStateToProps = (state) => {
    function compareAttempts(a, b) {
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
    const compare = (a, b) => {
        if (a.name > b.name)
            return 1;
        if (a.name < b.name)
            return -1;
        return 0;
    }
    const RStudents = _.map(state.RStudents, (val, uid) => {
        const attempts = _.map(val.attempts, (val) => {
            return { ...val }
        })
        attempts.sort(compareAttempts);
        const name = val.name;
        return { name, attempts, uid }
    })
    RStudents.sort(compare)
    return { RStudents };
}

export default connect(mapStateToProps, { RStudentsFetch, studentRestore })(AStudents)