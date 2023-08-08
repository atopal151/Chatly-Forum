import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";



const UserListItem = ({ name, email, profileImage, onPress,iconName }) => {
  return (
    <View style={styles.container}>
      <Image source={profileImage} style={styles.profileImage} />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email || "--"}</Text>
      </View>
      <TouchableOpacity onPress={()=>{onPress()}}> 
        <Icon name={iconName} size={20} color="#8232E9" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#888',
  },
});

export default UserListItem;
