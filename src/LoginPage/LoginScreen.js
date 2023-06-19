import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleAlert = () => {
    Alert.alert(
      'Uyarı!',
      'Email veya Şifre alanınızı boş bırakamazsınız.',
      [
        { text: 'Tamam', onPress: () => console.log('Tamam pressed') }
      ],
      { cancelable: false }
    );
  };

  const handleLogin = () => {
    navigation.navigate("TabBar")
    /*if (password == "", email == "") {
      console.log("Şifren veya email boş olamaz");
      handleAlert();
    }
    else {
      auth()
        .signInAnonymously().then(() => {
          navigation.navigate("TabBar")
          console.log('User signed in anonymously');
        })
        .catch(error => {
          if (error.code === 'auth/operation-not-allowed') {
            console.log('Enable anonymous in your firebase console.');
          }
          console.error(error);
        });
    }*/
  };


  return (
    <View style={styles.container}>
      <Image source={require('../../assets/online_forum.jpg')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate("SignUp") }}>
        <Text style={styles.text1}>Hesabın yok mu? Kayıt ol!</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    backgroundColor: '#FDBC68',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    margin: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;

