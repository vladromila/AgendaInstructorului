import React from 'react';
import _ from 'lodash';
import { Text, FlatList,ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Container, List } from 'native-base';
import { ListItem } from 'react-native-elements';
import Icon1 from 'react-native-vector-icons/FontAwesome'

class CanceledClasses extends React.Component {
    constructor() {
        super();
        this.state = {

            months: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie']
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.state.params.title}: Ore Anulate`,
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

    render() {console.log(this.props.canceledClasses)
        return (
            <ScrollView>
                <List>

                    <FlatList
                        ListHeaderComponent={<Text style={{ fontSize: 21, alignSelf: 'center', fontWeight: 'bold', color: '#1E6EC7' }}>Sedinte anulate</Text>}
                        data={this.props.canceledClasses}
                        renderItem={({ item }) => {
                            let minutes
                            if (item.minutes < 10)
                                minutes = `0${item.minutes}`
                            else
                                minutes = item.minutes;
                            if (item.studentUid === this.props.navigation.state.params.uid)
                                return <ListItem
                                    rightIcon={<Icon1 color='red' size={28} name='ban' />}
                                    title={<Text>Data: <Text style={{ fontWeight: 'bold' }}>{item.day} {this.state.months[item.month]} {item.year}</Text> Ora:<Text style={{ fontWeight: 'bold' }}>{item.hour}:{minutes}</Text></Text>}
                                />
                        }}
                    />

                </List>
               
                </ScrollView>)
    }
}
mapStateToProps = state => {
    const canceledClasses = _.map(state.canceledClasses, (val, uid) => {
        return { ...val, uid };
    });
    return { canceledClasses }
}

export default connect(mapStateToProps, {})(CanceledClasses);