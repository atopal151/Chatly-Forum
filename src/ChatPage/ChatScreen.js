import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import UserListItem from '../component/UserListItem';
import { withNavigation } from '@react-navigation/compat';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth"

class ChatScreen extends Component {
  state = {
    searchQuery: '',
    userData: [],
    refreshing: false,
  };

  loadUserData = async () => {
    firestore()
      .collection('chats')
      .doc(auth().currentUser.uid)
      .collection('user')
      .onSnapshot((snapshot) => {
        const userData = snapshot.docs.map((doc) => doc.data()).reverse();
        this.setState({ userData });
        console.log(userData);
      }, (error) => {
        console.log('Veriler yüklenirken hata oluştu:', error);
      });
  };

  chatDelete = async (uid) => {
    try {
      await firestore()
        .collection('chats')
        .doc(auth().currentUser.uid)
        .collection('user')
        .doc(uid)
        .delete().then(() => {
          console.log('Chat deleted!');
        });

      const messagesRef = firestore()
        .collection('messages')
        .doc(auth().currentUser.uid + "--" + uid)
        .collection("chat");

      messagesRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete().then(() => {
            console.log('Message deleted:', doc.id);
          }).catch((error) => {
            console.error('Message deletion failed:', error);
          });
        });
      }).catch((error) => {
        console.error('Query failed:', error);
      });

      this.loadUserData();
    } catch (error) {
      console.error('Delete operation failed:', error);
    }
  };

  handleRefresh = () => {// yenileme alanı
    this.setState({ refreshing: true });
    this.loadUserData();
    this.setState({ refreshing: false });
  };

  componentDidMount() {
    this.loadUserData();
  }

  render() {
    const { navigation } = this.props;
    const { refreshing } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerStyle}>
          <Text style={styles.headerTextStyle}>Sohbetler</Text>
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
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={this.handleRefresh} />
            }
          >
            <View style={{ flex: 1, padding: 10 }}>
              {this.state.userData
                .filter((user) =>
                  user.name.toLowerCase().includes(this.state.searchQuery.toLowerCase())
                )
                .map((user) => (
                  <TouchableOpacity
                    key={user.uid}
                    onPress={() =>
                      navigation.navigate('MessageBoxScreen', {
                        userName: user.name,
                        userMail: user.mail,
                        userPhoto: require('../../assets/pp.png'),
                        uid: user.uid,
                      })
                    }
                  >
                    <UserListItem
                      name={user.name}
                      email={user.mail}
                      profileImage={require('../../assets/pp.png')}
                      iconName={"trash-outline"}
                      onPress={() => this.chatDelete(user.uid)}
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
  menuContainer: {
    position: 'absolute',
    top: 1,
    right: 30,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    padding: 10,
    elevation: 10,
    borderRadius: 8,
  },
  menuItem: {
    fontSize: 18,
    height: 30,
    width: 100,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 30,
    paddingVertical: 5,
  },
  headerStyle: {
    alignItems: "baseline",
    margin: 10,
    justifyContent: 'flex-start',
  },
  headerTextStyle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
    color: "#8232E9"
  }
});

export default withNavigation(ChatScreen);
