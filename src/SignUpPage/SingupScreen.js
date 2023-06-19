import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore"


const SignUpScreen = () => {

  const handleAlert = () => {
    Alert.alert(
      'Uyarı!',
      'AdSoyad alanınızı veya E-posta alanınızı boş bırakamazsınız.',
      [
        { text: 'Tamam', onPress: () => console.log('Tamam pressed') }
      ],
      { cancelable: false }
    );
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setAgainPassword] = useState('');
  const [uyari, setUyari] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {

    if (password == passwordAgain) {
      if (name == "", email == "", password == "") {
        console.log("Name veya email boş");
        handleAlert();
      }
      else {

        navigation.navigate("Login")
        //setUyari(' ');
        //firestore().collection("users").add({ name: name, mail: email })
        /* auth()
           .createUserWithEmailAndPassword("email.gmail.com", "password")
           .then(() => {
             navigation.navigate("Login")
             console.log('User account created & signed in!');
           })
           .catch(error => {
             if (error.code === 'auth/email-already-in-use') {
               console.log('That email address is already in use!');
             }
             if (error.code === 'auth/invalid-email') {
               console.log('That email address is invalid!');
             }
             console.error(error);
           });*/

        auth()
          .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
          .then(() => {
            console.log('User account created & signed in!');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }

            console.error(error);
          });
      }
    }
    else {
      console.log("Şifre tekrarınız yanlış");
      setUyari('* Şifreler eşleşmiyor. Lütfen doğru şekilde girin.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/personsetting.jpg')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Ad Soyad"
        value={name}
        onChangeText={(text) => setName(text)}
      />
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
      <Text style={styles.errorText}>{uyari}</Text>
      <TextInput
        style={styles.input}
        placeholder="Şifre Tekrar"
        secureTextEntry
        value={passwordAgain}
        onChangeText={(text) => setAgainPassword(text)}
      />
      <Text style={styles.errorText}>{uyari}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
        <Text style={styles.text1}>Hesabın var mı? Giriş yap!</Text>
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
  errorText: {
    color: "red"
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
    height: "35%",
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
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 20,

  },
  button: {
    backgroundColor: '#91488D',
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

export default SignUpScreen;

