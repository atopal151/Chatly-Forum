import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import UserListItem from '../component/UserListItem';
import { withNavigation } from '@react-navigation/compat';

class ChatScreen extends Component {
  state = {
    searchQuery: '',
  };

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
              onChangeText={(text) => this.setState({ searchQuery: text })} // Filter
            />
            <Icon name={'search'} size={20} color="grey" />
          </View>
        </View>
        <View style={styles.body2}>
          <ScrollView>
            <View style={{ flex: 1, padding: 10 }}>
              {userList
                .filter((user) =>
                  user.name
                    .toLowerCase()
                    .includes(this.state.searchQuery.toLowerCase()) // Filter function
                )
                .map((user) => ( // User Map
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('MessageBoxScreen', {
                        userName: user.name,
                        userMail: user.email,
                        userPhoto: user.profileImage,
                      })
                    }
                    key={user.id}
                  >
                    <UserListItem
                      key={user.id} // User List
                      name={user.name}
                      email={user.email}
                      profileImage={user.profileImage}
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


const userList = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    profileImage: require('../../assets/pp.png'),
  },
  {
    id: 2,
    name: 'Ayşe Demir',
    email: 'ayse@example.com',
    profileImage: require('../../assets/pp.png'),
  },
  {
    id: 3,
    name: 'Mehmet Şahin',
    email: 'mehmet@example.com',
    profileImage: require('../../assets/pp.png'),
  },
  {
    id: 4,
    name: 'Fatma Yıldız',
    email: 'fatma@example.com',
    profileImage: require('../../assets/pp.png'),
  },
  {
    id: 5,
    name: 'Ali Öztürk',
    email: 'ali@example.com',
    profileImage: require('../../assets/pp.png'),
  },
  {
    id: 6,
    name: 'Zeynep Aktaş',
    email: 'zeynep@example.com',
    profileImage: require('../../assets/pp.png'),
  },

];


export default withNavigation(ChatScreen);



