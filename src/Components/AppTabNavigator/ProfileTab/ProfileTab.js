import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    LayoutAnimation,
    ScrollView
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { CardSection, Card } from '../../common/index'
import firebase from 'firebase';
import { Button, Header, List, ListItem } from 'react-native-elements';
import { Icon } from 'native-base';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            months: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
            isFirstTryListVisible: false,
            isAllAlistVisible: false,
            firstTryCount: null,
            firstTryList: [],
            number: null,
            allAlist: [],
            allAcount: null,
            selectedATitem: null,
            selectedFTitem: null
        }
    }
    static navigationOptions = {
        header: null,
        tabBarIcon: ({ tintColor }) => (
            <Icon name="person" style={{ color: tintColor }} />
        )
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.wantedInfo)
            if (nextProps.wantedInfo.count) {
                this.setState({ firstTryCount: nextProps.wantedInfo.count })
                let array = _.map(nextProps.wantedInfo.list, (val, uid) => {
                    return { ...val, uid }
                });
                this.setState({ firstTryList: array })
            }
        if (nextProps.wantedInfo1)
            if (nextProps.wantedInfo1.count) {
                this.setState({ allAcount: nextProps.wantedInfo1.count })
                let array = _.map(nextProps.wantedInfo1.list, (val, uid) => {
                    return { ...val, uid }
                });
                this.setState({ allAlist: array })
            }
    }
    render() {
        return (
            <ScrollView
                style={{
                    backgroundColor: 'white'
                }}
            >
                <View>
                    <Header
                        backgroundColor={'#1E6EC7'}
                        placement="left"
                        leftComponent={<Icon name='people' style={{ color: 'white' }} onPress={() => {
                            this.props.navigation.navigate('AStudents');
                        }} />}
                        centerComponent={{ text: 'Profil', style: { color: '#fff', fontWeight: 'bold', fontSize: 22 } }}
                        rightComponent={<Icon name="car" style={{ color: 'white' }} onPress={() => {
                            const { students } = this.props;
                            this.props.navigation.navigate('AddMoney', { students })
                        }} />}
                    /></View>
                <Text style={{ alignSelf: 'center', fontSize: 24 }}>{firebase.auth().currentUser.email}</Text>
                <ListItem
                    containerStyle={{ backgroundColor: 'white' }}
                    underlayColor={'rgba(0,0,0,0)'}
                    title={'Lista elevilor admisi'}
                    onPress={() => {
                        this.props.navigation.navigate('AStudents')
                    }}
                />
                <ListItem
                    containerStyle={{ backgroundColor: 'white' }}
                    underlayColor={'rgba(0,0,0,0)'}
                    title={'Lista elevilor respinsi'}
                    onPress={() => {
                        this.props.navigation.navigate('RStudents')
                    }}
                />

                {this.state.firstTryCount !== null ?

                    <View>
                        <ListItem
                            containerStyle={{ backgroundColor: 'white' }}
                            underlayColor={'rgba(0,0,0,0)'}
                            onPress={() => {
                                this.setState({ isFirstTryListVisible: !this.state.isFirstTryListVisible })
                            }}
                            title={`Elevi admisi din prima incercare: ${this.state.firstTryCount}`}
                            rightIcon={this.state.isFirstTryListVisible === true ? <Icon name="md-arrow-dropdown" /> : <Icon name="md-arrow-dropright" />}
                        />
                        {this.state.isFirstTryListVisible === true ?
                            <List
                                containerStyle={{ paddingLeft: 20, marginTop: 0, backgroundColor: 'rgba(0,0,0,0)' }}>
                                <FlatList
                                    extraData={this.state}
                                    data={this.state.firstTryList}
                                    renderItem={({ item }) => {
                                        return <View><ListItem
                                            underlayColor={'rgba(0,0,0,0)'}
                                            onPress={() => {
                                                LayoutAnimation.spring();
                                                if (this.state.selectedFTitem === item.uid)
                                                    this.setState({ selectedFTitem: null })
                                                else
                                                    this.setState({ selectedFTitem: item.uid })
                                            }}
                                            containerStyle={{ borderLeftWidth: 1, backgroundColor: 'white' }}
                                            title={item.nume}
                                        />
                                            {this.state.selectedFTitem === item.uid ? <View>
                                                <CardSection style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
                                                    <Text>Data: <Text style={{ fontWeight: 'bold' }}>{item.day} {this.state.months[item.month]} {item.year}</Text></Text>
                                                </CardSection>
                                                <CardSection style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
                                                    <Text>Numar de incercari: <Text style={{ fontWeight: 'bold' }}>{item.incercare}</Text></Text>
                                                </CardSection>
                                                <CardSection style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
                                                    <Text>Nume Politist: <Text style={{ fontWeight: 'bold' }}>{item.numePolitist}</Text></Text>
                                                </CardSection>
                                            </View> : null}
                                        </View>
                                    }}
                                />
                            </List> : null}
                    </View> : null}
                {this.state.allAcount !== null ?
                    <View>
                        <ListItem
                            containerStyle={{ backgroundColor: 'white' }}
                            underlayColor={'rgba(0,0,0,0)'}
                            onPress={() => {
                                this.setState({ isAllAlistVisible: !this.state.isAllAlistVisible })
                            }}
                            title={`Numar de elevi admisi: ${this.state.allAcount}`}
                            rightIcon={this.state.isAllAlistVisible === true ? <Icon name="md-arrow-dropdown" /> : <Icon name="md-arrow-dropright" />}
                        />
                        {this.state.isAllAlistVisible === true ?
                            <List
                                containerStyle={{ paddingLeft: 20, marginTop: 0, backgroundColor: 'rgba(0,0,0,0)' }}>
                                <FlatList
                                    extraData={this.state}
                                    data={this.state.allAlist}
                                    renderItem={({ item }) => {
                                        return <View><ListItem
                                            underlayColor={'rgba(0,0,0,0)'}
                                            onPress={() => {
                                                LayoutAnimation.spring();
                                                if (this.state.selectedATitem === item.uid)
                                                    this.setState({ selectedATitem: null })
                                                else
                                                    this.setState({ selectedATitem: item.uid })
                                            }}
                                            containerStyle={{ borderLeftWidth: 1, backgroundColor: 'white' }}
                                            title={item.nume}
                                        />{this.state.selectedATitem === item.uid ?
                                            <View>
                                                <CardSection style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
                                                    <Text>Data: <Text style={{ fontWeight: 'bold' }}>{item.day} {this.state.months[item.month]} {item.year}</Text></Text>
                                                </CardSection>
                                                <CardSection style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
                                                    <Text>Numar de incercari: <Text style={{ fontWeight: 'bold' }}>{item.incercare}</Text></Text>
                                                </CardSection>
                                                <CardSection style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
                                                    <Text>Nume Politist: <Text style={{ fontWeight: 'bold' }}>{item.numePolitist}</Text></Text>
                                                </CardSection>

                                            </View>
                                            : null}
                                        </View>

                                    }}
                                /></List> : null}
                    </View> : null}
                <Button
                    title="Log Out"
                    titleStyle={{ fontWeight: "700" }}
                    buttonStyle={{
                        marginTop: 3,
                        alignSelf: 'center',
                        backgroundColor: "#1E6EC7",
                        width: 300,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    containerStyle={{ marginTop: 20 }}
                    onPress={() => firebase.auth().signOut()}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#1E6EC7',
        height: 200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 20,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: '#1E6EC7',
        marginTop: 10
    },
});
mapStateToProps = state => {
    const info = state.info;
    let array = _.toArray(info);
    let wantedInfo = array[1];
    let wantedInfo1 = array[0];
    return { wantedInfo, wantedInfo1 }
}
export default connect(mapStateToProps, {})(Profile);
