import React, { Component } from 'react';
import { Text, StyleSheet, View, SafeAreaView } from 'react-native';

export default class AddForum extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text> AddForum </Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    }
});
