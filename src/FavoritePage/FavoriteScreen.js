import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import UserListItem from '../component/UserListItem';
import { withNavigation } from '@react-navigation/compat';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import UserStore from '../component/UserStore';

class FavoriteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      userData: [],
      refreshing: false
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

  handleRefresh = () => {// yenileme alanı
    this.setState({ refreshing: true });
    this.loadUserData();
    this.setState({ refreshing: false });
  };


  handleStartChat = (user) => {


    console.log(auth().currentUser.uid);
    console.log(user.uid);
    console.log(user.name);
    console.log(user.email);
    console.log(Date());
    console.log(UserStore.user);
    console.log(UserStore.mail);

    firestore()
      .collection('chats')
      .doc(auth().currentUser.uid)
      .collection('user')
      .doc(user.uid)
      .set({
        name: user.name,
        mail: user.email || "--",
        uid: user.uid,
        endMessageTime: new Date()
      })
      .then(() => {
        console.log('Chats added!');
      })
      .catch((error) => {
        console.log('Hata:', error);
      });

    firestore()
      .collection('chats')
      .doc(user.uid)
      .collection('user')
      .doc(auth().currentUser.uid)
      .set({
        name: UserStore.user,
        mail: UserStore.mail || "--",
        uid: auth().currentUser.uid,
        endMessageTime: new Date()
      })
      .then(() => {
        console.log('Chats added!');
      })
      .catch((error) => {
        console.log('Hata:', error);
      });

    this.props.navigation.navigate('MessageBoxScreen', {
      userName: user.name,
      userMail: user.email,
      userPhoto: user.profileImage,
      uid: user.uid
    });
  };

  componentDidMount() {
    this.loadUserData();
  }

  render() {
    const { navigation } = this.props;
    const { searchQuery, userData, refreshing } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>Kullanıcılar</Text>
          </View>
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
          <ScrollView refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.handleRefresh}
            />
          }>
            <View style={{ flex: 1, padding: 10 }}>
              {userData
                .filter((user) =>
                  user.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((user) => (
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert(
                        "Kullanıcı Adı: " + user.name,
                        "Mail: " + (user.email || "--"),
                        [
                          {
                            text: 'Sohbet Başlat',
                            onPress: () => this.handleStartChat(user)
                          },
                          {
                            text: 'Kapat',
                            onPress: () => { }
                          },
                          // Diğer butonlar...
                        ]
                      )
                    }
                    key={user.uid}
                  >
                    <UserListItem
                      key={user.uid}
                      name={user.name}
                      email={user.email}
                      onPress={() => this.handleStartChat(user)}
                      iconName={"chevron-forward-sharp"}
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
  headerStyle:{
    alignItems: "baseline",
    margin:10,
    justifyContent: 'flex-start',
  },
  headerTextStyle:{
    fontSize:18,
    fontWeight:"bold",
    margin:10,
    color:"#8232E9"
  }
});

export default withNavigation(FavoriteScreen);
