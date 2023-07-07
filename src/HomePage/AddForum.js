import React, { Component } from 'react';
import { Text, StyleSheet, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import firestore from "@react-native-firebase/firestore"

export default class AddForum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      titletext: '',
      descriptiontext: ''
    };
  }

  render() {
    const { titletext, descriptiontext } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Konu başlığı"
            placeholderTextColor="#888"
            value={titletext}
            onChangeText={(titletext) => this.setState({ titletext })}
          />
        </View>
        <View style={styles.inputContainer2}>
          <TextInput
            style={styles.input}
            placeholder="Açıklama"
            placeholderTextColor="#888"
            value={descriptiontext}
            multiline={true}
            numberOfLines={14}
            onChangeText={(descriptiontext) => this.setState({ descriptiontext })}
          />
        </View>
        <TouchableOpacity style={styles.categoryButton} onPress={() => {
          firestore()
            .collection('forum')
            .add({
              title: titletext,
              description: descriptiontext,
            })
            .then(() => {
              console.log('Forum added!');
            });
        }}>
          <Text style={styles.categoryText}>Paylaş</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  categoryButton: {
    backgroundColor: '#8232E9',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
  },
  categoryText: {
    fontSize: 15,
    color: "white",
    margin: 10,
    fontWeight: "bold"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    margin: 10,
    borderRadius: 30,
    borderColor: 'grey',
    paddingHorizontal: 20,
  },
  inputContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    margin: 10,
    borderRadius: 30,
    borderColor: 'grey',
    paddingHorizontal: 20,
    height: 150
  },
  input: {
    flex: 1,
    height: 40,
    margin: 10,
    color: '#333',
  },
});
