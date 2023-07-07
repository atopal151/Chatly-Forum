import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import userStore from '../component/UserStore';
import Icon from 'react-native-vector-icons/Ionicons';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    if (auth().currentUser !== null) {
      const currentUser = auth().currentUser.uid;
      userStore.setUser(currentUser)
      console.log('User signed in anonymously');
      console.log(userStore.user);
      this.props.navigation.navigate("TabBar");
    }
  }
  handleAlert = () => {
    Alert.alert(
      'Uyarı!',
      'Email veya Şifre alanınızı boş bırakamazsınız.',
      [
        { text: 'Tamam', onPress: () => console.log('Tamam pressed') }
      ],
      { cancelable: false }
    );
  };

  handleLogin = () => {
    const { email, password } = this.state;
    const { navigation } = this.props;
    if (password === "" || email === "") {
      console.log("Şifre veya email boş olamaz");
      this.handleAlert();
    } else {

    }
  };

  handleAnonymouslyLogin = () => {
    auth()
      .signInAnonymously()
      .then(() => {
        const currentUser = auth().currentUser.uid;
        userStore.setUser(currentUser)
        console.log('User signed in anonymously');
        console.log(userStore.user);
        this.props.navigation.navigate("TabBar");
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }
        console.error(error);
      });
  };


  render() {
    const { email, password } = this.state;
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/online_forum.jpg')} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          value={email}
          onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          secureTextEntry
          value={password}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.props.navigation.navigate("SignUp") }}>
          <Text style={styles.text1}>Hesabın yok mu? <Text style={{ fontWeight: '900' }}>Kayıt Ol!</Text></Text>
        </TouchableOpacity>
        <View style={styles.fastLog}>
          <TouchableOpacity style={styles.AnonymouslyButton} onPress={this.handleAnonymouslyLogin}>
            <Icon name="person" size={20} color="white" style={styles.AnonymouslyIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.GoogleButton} onPress={() => { }}>
            <Icon name="logo-google" size={20} color="white" style={styles.AnonymouslyIcon} />
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 40,
  },
  text1: {
    color: 'grey',
    justifyContent: "flex-end",
    alignItems: "flex-end",
    fontSize: 13,
    fontWeight: '400',
  },
  logo: {
    width: "90%",
    height: "30%",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: 350,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#8232E9',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: "center",
    width: "50%",
    margin: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  AnonymouslyButton: {
    backgroundColor: '#7f8fa6',
    paddingVertical: 9,
    paddingHorizontal: 9,
    borderRadius: 50,
    alignItems: "center",
    margin: 20
  },
  GoogleButton: {
    backgroundColor: '#e55039',
    paddingVertical: 9,
    paddingHorizontal: 9,
    borderRadius: 50,
    alignItems: "center",
    margin: 20
  },
  AnonymouslyIcon: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  fastLog: {
    flexDirection: "row"
  }


});

export default LoginScreen;
