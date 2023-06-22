import React, { Component } from 'react';
import { Text, StyleSheet, View, SafeAreaView } from 'react-native';

export default class ForumDetail extends Component {
    render() {
        const { route } = this.props;
        const { itemTitle, itemDescription } = route.params;
        return (
            <SafeAreaView style={styles.container}>
                <Text> {itemTitle} </Text>
                <Text> {itemDescription} </Text>
            </SafeAreaView>
        );
    } s
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    }
});
