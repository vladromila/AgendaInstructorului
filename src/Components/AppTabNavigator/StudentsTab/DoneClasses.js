import React from 'react';
import _ from 'lodash';
import { Text, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Container, List } from 'native-base';
import { ListItem } from 'react-native-elements';
import Icon1 from 'react-native-vector-icons/FontAwesome'

class DoneClasses extends React.Component {
    constructor() {
        super();
        this.state = {
            nCount: 0,
            sCount: 0,
            months: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie']
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.state.params.title}: Ore completate`,
            headerStyle: {
                backgroundColor: '#1E6EC7'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontSize: 16,
                color: 'white',
                fontWeight: 'bold',
            }
        }
    }

    render() {console.log(this.props.navigation.state.params.doneClasses);
        return (
            <ScrollView>
                <List>

                    <FlatList
                        ListHeaderComponent={<Text style={{ fontSize: 19, alignSelf: 'center', color: '#1E6EC7' }}>Sedintele normale completate:<Text style={{ fontSize: 21, alignSelf: 'center', fontWeight: 'bold', color: '#1E6EC7' }}> {this.props.navigation.state.params.nrn}/15</Text></Text>}
                        data={this.props.navigation.state.params.doneClasses}
                        renderItem={({ item }) => {
                            let minutes
                            if (item.minutes < 10)
                                minutes = `0${item.minutes}`
                            else
                                minutes = item.minutes;
                           
                                return <ListItem
                                    rightIcon={<Icon1 color='green' size={28} name='check' />}
                                    title={<Text>Data: <Text style={{ fontWeight: 'bold' }}>{item.day} {this.state.months[item.month]} {item.year}</Text> Ora:<Text style={{ fontWeight: 'bold' }}>{item.hour}:{minutes}</Text></Text>}
                                />}
                        }
                    />

                </List>
                <List>
                    <FlatList
                        ListHeaderComponent={<Text style={{ fontSize: 21, alignSelf: 'center', color: '#1E6EC7' }}>Sedintele suplimentare completate:<Text style={{ fontSize: 21, alignSelf: 'center', fontWeight: 'bold', color: '#1E6EC7' }}> {this.props.navigation.state.params.nrs}</Text></Text>}
                        data={this.props.navigation.state.params.extraClasses}
                        renderItem={({ item }) => {
                            let minutes
                            if (item.minutes < 10)
                                minutes = `0${item.minutes}`
                            else
                                minutes = item.minutes;
                                return <ListItem
                                    rightIcon={<Icon1 color='green' size={28} name='check' />}
                                    title={<Text>Data: <Text style={{ fontWeight: 'bold' }}>{item.day} {this.state.months[item.month]} {item.year}</Text> Ora:<Text style={{ fontWeight: 'bold' }}>{item.hour}:{minutes}</Text></Text>}
                                />
                        }}
                    />
                </List>
            </ScrollView>)
    }
}

export default connect()(DoneClasses);