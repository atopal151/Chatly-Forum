import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, FlatList, Text, SafeAreaView, Image } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

export default class MessageBoxScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            text: ''
        };
    }

    sendMessage = () => {
        const { text, messages } = this.state;
        if (text.trim() === '') {
            return;
        }
        const newMessage = {
            id: messages.length + 1,
            text: text.trim(),
            sender: 'user'
        };
        this.setState({
            messages: [...messages, newMessage],
            text: ''
        });
    };

    renderMessage = ({ item }) => {
        const { sender, text } = item;
        const isUser = sender === 'user';

        return (
            <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.otherMessage]}>
                <View style={styles.messageContent}>
                    <Text style={styles.messageText}>{text}</Text>
                </View>
            </View>
        );
    };

    render() {
        const { messages, text } = this.state;
        const { route } = this.props;
        const { userName, userMail, userPhoto } = route.params;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.titleStyle}>
                    <Image source={require('../../assets/pp.png')} style={styles.photo} />
                    <View>
                    <Text style={styles.userNameText}>{userName}</Text>
                    <Text style={styles.userNameText2}>{userMail}</Text>
                    </View>
                </View>
                <FlatList
                    data={messages}
                    renderItem={this.renderMessage}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.messagesContainer}
                    inverted
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Mesajınızı yazın"
                        placeholderTextColor="#888"
                        value={text}
                        onChangeText={(text) => this.setState({ text })}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={this.sendMessage}>
                        <Icon name="send" size={20} color='grey' />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    titleStyle: {
        margin: 10,
        flexDirection:"row",
        alignItems:"center"
    },
    photo: {
        height: 50,
        width: 50
    },
    userNameText:{
        fontSize:16,
        fontWeight:800,
        color:"black",
        marginLeft:5
    },
    userNameText2:{
        fontSize:14,
        fontWeight:300,
        color:"black",
        marginLeft:5
    },

    messagesContainer: {
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    messageContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#eaeaea',
        borderRadius: 10,
        margin: 5,
        padding: 10,
        maxWidth: '70%',
    },
    userMessage: {
        alignSelf: 'flex-end',
        borderBottomLeftRadius: 25,
        borderTopStartRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: '#8232E9',
    },
    otherMessage: {
        alignSelf: 'center',
    },
    messageContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageText: {
        fontSize: 16,
        color: 'white',
        margin: 5,
        marginLeft: 5,
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
    input: {
        flex: 1,
        height: 40,
        margin: 5,
        color: '#333',
    },
    sendButton: {
        marginLeft: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
});
