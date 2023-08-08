import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  RefreshControl,
} from 'react-native';
import { Divider } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons";
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";
import userStore from '../component/UserStore';
import ItemCard from '../component/ItemCard';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forumData: [],
      refreshing: false,
      isMenuVisible: false,
    };
  }

  loadForumData = () => {
    firestore()
      .collection('forum')
      .where('shareUser', '==', auth().currentUser.uid)
      .orderBy('createdAt', 'asc')
      .onSnapshot((snapshot) => {
        const forumData = snapshot.docs.map(doc => doc.data()).reverse();
        this.setState({ forumData });
        console.log(forumData);
      }, (error) => {
        console.log('Error loading forum data:', error);
      });
  };

  handleRefresh = () => {// yenileme alanı
    this.setState({ refreshing: true });
    this.loadForumData();
    this.setState({ refreshing: false });
  };


  toggleMenu = () => {
    this.setState((prevState) => ({
      isMenuVisible: !prevState.isMenuVisible,
    }));
  };

  handleLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
     
      this.props.navigation.navigate("Login");
  };

  renderMenu = () => {
    const { isMenuVisible } = this.state;
    if (!isMenuVisible) return null;

    return (
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={this.handleLogout}>
          <Text style={styles.menuItem}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    );
  };

  componentDidMount() {
    this.loadForumData();
    console.log(this.state.forumData);
  }

  render() {
    const { navigation } = this.props;
    const { forumData, refreshing, isMenuVisible } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Image
            source={require('../../assets/pp.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.body1}>
          <Text style={styles.text1}>{userStore.user}</Text>
          <Text style={styles.text2}>{userStore.mail || "--"}</Text>
        </View>
        <View style={styles.body2}>
          <View style={styles.roww1}>
            <View style={styles.row1}>
              <Icon name="call" size={20} color="#8232E9" />
            </View>
            <View style={styles.row2}>
              <Text style={styles.text2}> +90  533 222 55 88 </Text>
            </View>
          </View>
          <View style={styles.roww2}>
            <View style={styles.row1}>
              <Icon name="mail" size={20} color="#8232E9" />
            </View>
            <View style={styles.row2}>
              <Text style={styles.text2}> {userStore.mail || "--"}</Text>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <Divider />
          <View style={styles.roww1}>
            <View style={styles.row1}>
              <Text style={styles.label}>Konuların</Text>
              <Text style={styles.count}>{forumData.length}</Text>
            </View>
            <Divider />
            <View style={styles.row1}>
              <Text style={styles.label}>Mesajların</Text>
              <Text style={styles.count}>{userStore.messageCount}</Text>
            </View>

            <View style={styles.row1}>
              <TouchableOpacity onPress={this.toggleMenu}>
                <Icon name="ellipsis-horizontal-sharp" size={20} color="#8232E9" />
              </TouchableOpacity>
            </View>
            {this.renderMenu()}
          </View>
          <Divider />
        </View>
        <View style={styles.content2}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.handleRefresh}
              />
            }
          >
            {forumData.map((item, index) => (
              <ItemCard
                key={index}
                title={item.title}
                description={item.description}
                onPress={() => {
                  navigation.navigate('ForumDetail', {
                    savedDocId: item.savedDocId,
                    itemTitle: item.title,
                    itemDescription: item.description,
                  });
                }}
              />
            ))}
          </ScrollView>
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
  row1: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  row2: {
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 10,
    marginLeft: 20
  },
  backgroundImage: {
    position: 'absolute',
    top: 8,
    width: 120,
    height: 120,
    marginLeft: 30
  },
  label: {
    fontSize: 15,
    fontWeight: 600,
    color: "grey",
    margin: 5
  },
  count: {
    fontSize: 28,
    fontWeight: 600,
    color: "black"
  },
  content: {
    flex: 1.2,
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
    textTransform: 'uppercase',
    fontSize: 19,
    fontWeight: 700,
    color: "black",
    marginRight: 10
  },
  text2: {
    fontSize: 15,
    fontWeight: 300,
    color: "grey"
  },
  menuContainer: {
    position: 'absolute',
    top: 50,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.3,
    backgroundColor:"white",
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
  },

});

export default ProfileScreen;
