import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import Router from './src/Router';


export default class App extends Component {
  render() {
    return (
     <Router/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textsty: {
    color: "grey",
    fontSize: 20,
    fontWeight: "600"
  },
  textsty2: {
    color: "black",
    fontSize: 20,
    fontWeight: "600"
  }
});
