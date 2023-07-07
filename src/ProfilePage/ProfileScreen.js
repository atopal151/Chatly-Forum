import React from 'react';
import { View, StyleSheet, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons"
import auth from '@react-native-firebase/auth';
import userStore from '../component/UserStore';
import {observer} from "mobx-react/native";


const catoegories = (icon, title, onPress) => {
  return (

    <View style={styles.roww1}>
      <View style={styles.row1}>
        <TouchableOpacity onPress={onPress}>
          <Icon name={icon} size={20} color="grey" />
        </TouchableOpacity>
      </View>
      <View style={styles.row2}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.text2}> {title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View><Image
          source={require('../../assets/pp.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        /></View>
        <View style={styles.body1}>
          <Text style={styles.text1}>{userStore.user}</Text>
          <Text style={styles.text2}>Fashion Model</Text>
        </View>
        <View style={styles.body2}>
          <View style={styles.roww1}>
            <View style={styles.row1}>
              <Icon name="call" size={20} color="#8232E9" />
            </View>
            <View style={styles.row2}>
              <Text style={styles.text2}> +90  533 222 55 88</Text>
            </View>
          </View>
          <View style={styles.roww2}>
            <View style={styles.row1}>
              <Icon name="mail" size={20} color="#8232E9" />
            </View>
            <View style={styles.row2}>
              <Text style={styles.text2}> nameusername@gmail.com</Text>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <Divider />
          <View style={styles.roww1}>
            <View style={styles.row1}>
              <Text style={styles.label}>Konuların</Text>
              <Text style={styles.count}>2</Text>
            </View>
            <Divider />
            <View style={styles.row1}>
              <Text style={styles.label}>Mesajların</Text>
              <Text style={styles.count}>10</Text>
            </View>
          </View>
          <Divider />
        </View>
        <View style={styles.content2}>
          {catoegories("heart", "favorilerin", () => { })}
          {catoegories("hammer", "Ayarlar", () => { })}
          {catoegories("glasses-outline", "Search", () => { })}
          {catoegories("image", "Profil Fotoğrafı", () => { })}
          {catoegories("journal", "Ödeme", () => { })}
          {catoegories("location", "Konum", () => { })}
          {catoegories("power", "Oturumu Kapat", () => {
            auth()
              .signOut()
              .then(() => { 
                console.log('User signed out!')
                this.props.navigation.navigate("Login")
              });
          })}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  roww1: { flexDirection: "row", flex: 1 },
  roww2: { flexDirection: "row", flex: 1 },
  row1: { alignItems: "center", justifyContent: "center", flex: 1 },
  row2: { alignItems: "flex-start", justifyContent: "center", flex: 10, marginLeft: 20 },

  backgroundImage: {
    position: 'absolute',
    top: 8,
    width: 120,
    height: 120,
    marginLeft: 30
  },
  label: { fontSize: 15, fontWeight: 600, color: "grey", margin: 5 },
  count: { fontSize: 28, fontWeight: 600, color: "black" },
  content: {
    flex: 2,
    zIndex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  content2: {
    flex: 7,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  body1: {
    flex: 3,
    backgroundColor: "transparent",
    alignItems: "flex-start",
    marginLeft: 170,
    justifyContent: "center"
  },
  body2: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "flex-start",
    marginLeft: 30,
    justifyContent: "center"
  },
  text1: {
    fontSize: 19,
    fontWeight: 700,
    color: "black",
    marginRight:10
  },
  text2: {
    fontSize: 15,
    fontWeight: 300,
    color: "grey"
  }
});

export default ProfileScreen;

