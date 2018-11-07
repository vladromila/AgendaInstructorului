import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Modal,
  LayoutAnimation,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import firebase from 'firebase';
import { Confirm } from '../../common/index';
import { ImagePicker, Permissions, Camera } from 'expo'
import _ from 'lodash'
import { studentDelete, studentDeleteModalShowUp, closeModal } from '../../../actions/index'
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { Icon, Container, Spinner } from 'native-base'
import { Header } from "react-native-elements";
import { connect } from 'react-redux'
import { List, ListItem } from 'react-native-elements';
import { ProgressCircle } from 'react-native-svg-charts'


class ProfileCardView extends Component {
  constructor() {
    super()
    this.state = {
      isModalVisible: false,
      isImageModalVisible: false,
      imageUrl: '',
      loading: true,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.title}`,
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
  componentWillMount() {
    firebase.storage().ref(`images/${firebase.auth().currentUser.uid}/${this.props.navigation.state.params.item.uid}`).getDownloadURL().then(url => {
      this.setState({ imageUrl: url, loading: false })
    })
      .catch(e => this.setState({ imageUrl: '', loading: false }))

  }
  componentDidUpdate() {
    if (this.props.success === true)
      this.props.navigation.goBack();
  }
  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref(`images/${firebase.auth().currentUser.uid}/${this.props.navigation.state.params.item.uid}`);
    return ref.put(blob);
  }
  onChooseImagaPress = async () => {
    this.setState({ loading: true })
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });
    if (!result.cancelled) {

      this.uploadImage(result.uri, `${this.props.navigation.state.params.item.uid}`)
        .then(() => {
          firebase.storage().ref(`images/${firebase.auth().currentUser.uid}/${this.props.navigation.state.params.item.uid}`).getDownloadURL().then(url => {
            this.setState({ imageUrl: url, loading: false })
          })
        })
        .catch((e) => {
          this.setState({loading:false})
        })
    }
    else this.setState({ loading: false })
  }
  render() {
    let number = this.props.navigation.state.params.item.nrn;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.box}>
              <TouchableHighlight underlayColor={'rgba(0,0,0,0)'} onPress={() => this.setState({ isImageModalVisible: true })}>
                {this.state.loading === true ?
                  <View
                    style={{ height: 300, width: 300, backgroundColor: '#1E6EC7', justifyContent: 'center', alignContent: 'center', borderWidth: 1 }}
                  >
                    <Spinner style={{ alignSelf: 'center' }} color='white' />
                  </View>
                  : this.state.imageUrl === '' || this.state.imageUrl === null ?
                    <View
                      style={{ height: 300, width: 300, backgroundColor: 'white', backgroundColor: '#1E6EC7', justifyContent: 'center', alignContent: 'center', borderWidth: 1 }}
                    ><Text style={{ color: 'white', fontSize: 20, alignSelf: 'center', textAlign: 'center' }}>Nu ati adaugat o copie dupa buletin acestui elev</Text>
                    </View> :
                    <Image style={styles.profileImage} source={{ uri: this.state.imageUrl }} />}
              </TouchableHighlight>
              <Text style={styles.name}>{this.props.navigation.state.params.item.nume}</Text>
            </View>

            <List containerStyle={{ marginTop: 0 }}>
              <ListItem
                underlayColor={'#1E6EC7'}
                containerStyle={{ backgroundColor: '#1E6EC7' }}
                titleStyle={{ color: 'white', fontSize: 16 }}
                title={'Copie dupa buletin'}
                onPress={() => { this.setState({ isImageModalVisible: true }) }}
                rightIcon={<Icon1 name='edit' size={24} color={'white'}
                  onPress={this.onChooseImagaPress}
                />}
              />
              <ListItem title={
                <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>
                  Nume: <Text style={{ fontWeight: 'bold', paddingLeft: 10, color: 'white', fontSize: 16 }}>{this.props.navigation.state.params.item.nume}</Text>
                </Text>} containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }} rightIcon={{}} />
              <ListItem title={
                <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>
                  Numar de Telefon: <Text style={{ fontWeight: 'bold', paddingLeft: 10, color: 'white', fontSize: 16 }}>{this.props.navigation.state.params.item.phone}</Text>
                </Text>
              } containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }} />
              <ListItem title={
                <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>
                  CNP: <Text style={{ fontWeight: 'bold', paddingLeft: 10, color: 'white', fontSize: 16 }}>{this.props.navigation.state.params.item.cnp}</Text>
                </Text>
              } containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }} />
              <ListItem title={
                <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>
                  Numar Registru: <Text style={{ fontWeight: 'bold', paddingLeft: 10, color: 'white', fontSize: 16 }}>{this.props.navigation.state.params.item.registru}</Text>
                </Text>
              } containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }} />
              <ListItem title={
                <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>
                  Serie: <Text style={{ fontWeight: 'bold', paddingLeft: 10, color: 'white', fontSize: 16 }}>{this.props.navigation.state.params.item.serie}</Text>
                </Text>
              } containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }} />
              <ListItem title={
                <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>
                  Numarul de ore complete: <Text style={{ fontWeight: 'bold', paddingLeft: 10, color: 'white', fontSize: 16 }}>{this.props.navigation.state.params.item.nrn + this.props.navigation.state.params.item.nrs}</Text>
                </Text>
              } containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }}
                rightIcon={<Icon1 name='list-ol' onPress={() => {
                  const { nume, uid, nrn, nrs } = this.props.navigation.state.params.item
                  const doneClasses = _.toArray(this.props.navigation.state.params.item.doneClasses)
                  const extraClasses = _.toArray(this.props.navigation.state.params.item.extraClasses)
                  this.props.navigation.navigate('DoneClasses', { nume, uid, title: nume, nrn, nrs, doneClasses, extraClasses })
                }} style={{ paddingRight: 10, color: 'white' }} size={27} />}
              />
              <ListItem title={
                <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>
                  Istoricul orelor anurate:
                </Text>
              } containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }}
                rightIcon={<Icon1 name='history' onPress={() => {
                  const { nume, uid } = this.props.navigation.state.params.item
                  this.props.navigation.navigate('CanceledClasses', { nume, uid, title: nume })
                }} style={{ paddingRight: 10, color: 'white' }} size={27} />}
              /><ListItem title={'Progres:'} titleStyle={{ color: 'white', alignSelf: 'center' }} hideChevron containerStyle={{ backgroundColor: '#1E6EC7', borderBottomColor: '#1E6EC7' }} />
              <View style={{ backgroundColor: 'white', paddingTop: 10, paddingBottom: 10, backgroundColor: '#1E6EC7' }}>
                <ProgressCircle
                  style={{ height: 200, elevation: 10 }}
                  progress={number / 15}
                  progressColor={'white'}
                  backgroundColor={'black'}
                /></View>
            </List>
            <List>
              <ListItem title={<Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>Editeaza Elev</Text>} containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }} onPress={() => { this.props.navigation.navigate('EditStudent', this.props.navigation.state.params.item) }}
                rightIcon={<Icon1 name='edit' color='white' style={{ paddingRight: 10 }} size={30} />} />
              <ListItem title={<Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>Adauga o sedinta nenotata</Text>} containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }} rightIcon={<Icon1 name='plus' color='white' style={{ paddingRight: 10 }} size={30} />} />
              <ListItem title={<Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>Lista Orelor</Text>} containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }} rightIcon={<Icon1 name='list' color='white' style={{ paddingRight: 10 }} size={30} />} />
              <ListItem title={<Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>Sterge Elev</Text>} containerStyle={{ backgroundColor: '#1E6EC7' }} titleStyle={{ color: 'white' }} onPress={() => this.props.studentDeleteModalShowUp()} rightIcon={<Icon1 name='times' color='red' style={{ paddingRight: 10 }} size={30} />} />
            </List>
          </View>
        </ScrollView>
        <Confirm visible={this.props.isModalVisible} onAccept={() => {
          const { uid } = this.props.navigation.state.params.item;
          this.props.studentDelete({ uid })
        }} onDecline={() => {
          this.props.closeModal()
        }}>Sgur?</Confirm>
        <Modal visible={this.state.isImageModalVisible} transparent={false} onRequestClose={() => this.setState({ isImageModalVisible: false })}>
          <ImageViewer imageUrls={[{ url: this.state.imageUrl }]} />
        </Modal>
      </View>
    );
  }
}
mapStateToProps = (state) => {
  const { isModalVisible } = state.students;
  const { success } = state.students;
  return { isModalVisible, success }
}
export default connect(mapStateToProps, { studentDelete, studentDeleteModalShowUp, closeModal })(ProfileCardView)

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  box: {
    backgroundColor: '#1E6EC7',
    marginTop: 10,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height: 1,
      width: -2
    },
    paddingTop: 10
  },
  profileImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  name: {
    fontSize: 25,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  }
}); 