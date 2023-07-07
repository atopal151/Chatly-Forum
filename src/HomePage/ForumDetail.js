import React, { Component } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

export default class ForumDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            text: '',
            showTextInput: false,
        };
    }

    toggleTextInput = () => {
        this.setState((prevState) => ({
            showTextInput: !prevState.showTextInput
        }));

    };

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
            text: '',
            showTextInput: false
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
        const { messages, text, showTextInput } = this.state;
        const { itemTitle, itemDescription } = this.props.route.params;

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headerStyle}>
                    <Text style={{ fontWeight: "700", color:"white" }}> {itemTitle} </Text>
                </View>
                <View style={styles.describeStyle}>
                    <Text style={{ fontWeight: "700" }}>Açıklama: {<Text style={{ fontWeight: "300" }}>{itemDescription} </Text>}</Text>
                </View>
                <View style={styles.divider} />

                <View style={styles.bodyStyle}>
                    <FlatList
                        data={messages}
                        renderItem={this.renderMessage}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.messagesContainer}
                        inverted
                    />
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 5 }}>
                            {showTextInput && (
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

                            )}
                        </View>

                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={styles.addButton} onPress={this.toggleTextInput}>
                                {showTextInput ? (
                                    <Icon name="close" size={22} color="white" style={styles.addIcon} />
                                ) : (
                                    <Icon name="add" size={23} color="white" style={styles.addIcon} />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff"
    },
    headerStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin:10,
        borderRadius:25,
        backgroundColor:"#8232E9"
    },
    describeStyle: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    bodyStyle: {
        flex: 14,
    },
    userInfo: {
        marginLeft: 20,
        justifyContent: "center"
    },
    titleStyle: {
        marginLeft: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"

    },
    photo: {
        alignItems: "center",
        height: 50,
        width: 50
    },
    userNameText: {
        fontSize: 16,
        fontWeight: 800,
        color: "black",
        marginLeft: 5
    },
    userNameText2: {
        fontSize: 14,
        fontWeight: 300,
        color: "black",
        marginLeft: 5
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
        backgroundColor: '#d6afee',
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
        marginLeft: 10,
        marginRight: 10,
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

    addButton: {
        backgroundColor: 'blue',
        borderRadius: 60,
        backgroundColor: "#8232E9",
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addIcon: {
        marginRight: 0,
    },
    divider: {
        height: 1,
        backgroundColor: 'grey',
        marginVertical: 10,
        marginLeft:10,
        marginRight:10
    },
});
