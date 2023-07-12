import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import UserListItem from '../component/UserListItem';
import { withNavigation } from '@react-navigation/compat';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth"

class FavoriteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      userData: [],
    };
  }
  loadUserData = () => {
    firestore()
      .collection('users')
      .where(firestore.FieldPath.documentId(), '!=', auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        const userData = snapshot.docs.map(doc => doc.data()).reverse();
        this.setState({ userData });
        console.log(userData);
      }, (error) => {
        console.log('Error loading other users data:', error);
      });
  };
  

  componentDidMount() {
    this.loadUserData();
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.body1}>
          <View style={styles.borderstyle}>
            <TextInput
              style={styles.input}
              placeholder="Arama yapın"
              placeholderTextColor="#888"
              onChangeText={(text) => this.setState({ searchQuery: text })}
            />
            <Icon name={'search'} size={20} color="grey" />
          </View>
        </View>
        <View style={styles.body2}>
          <ScrollView>
            <View style={{ flex: 1, padding: 10 }}>
              {this.state.userData
                .filter((user) =>
                  user.name
                    .toLowerCase()
                    .includes(this.state.searchQuery.toLowerCase())
                )
                .map((user) => (
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert(
                        "Kullanıcı Adı: " + user.name,
                        "Mail: " + user.email || "--",
                        [
                          {
                            text: 'Sohbet Başlat',
                            onPress: (() => {
                              firestore()
                                .collection('chats')
                                .doc(auth().currentUser.uid)
                                .collection('user')
                                .doc(user.uid)
                                .set({
                                  name: `User` + user.uid,
                                  uid: user.uid,
                                  endMessageTime:firestore.FieldValue.serverTimestamp()
                                })
                                .then(() => {
                                  console.log('Chats added!');
                                });
                              navigation.navigate('MessageBoxScreen', {
                                userName: user.name,
                                userMail: user.email,
                                userPhoto: user.profileImage,
                              })
                            })
                          },
                        ],
                        { cancelable: false }
                      )
                    }
                    key={user.uid}
                  >
                    <UserListItem
                      key={user.uid}
                      name={user.name}
                      email={user.email}
                      profileImage={require('../../assets/pp.png')}
                    />
                  </TouchableOpacity>
                ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  borderstyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 25,
    paddingVertical: 1,
    paddingHorizontal: 19,
    margin: 10,
    height: 50,
  },
  input: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  body1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body2: {
    flex: 8,
    marginLeft: 5,
    marginRight: 5,
  },
});


export default withNavigation(FavoriteScreen);
