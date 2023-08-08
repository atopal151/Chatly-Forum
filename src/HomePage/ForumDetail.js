import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    FlatList,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import UserStore from '../component/UserStore';

export default class ForumDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messagesData: [],
            text: '',
            showTextInput: false,
        };
    }

    toggleTextInput = () => { //forumda yorum yapılacak textboxın görünürlüğünü ayarlar
        this.setState((prevState) => ({
            showTextInput: !prevState.showTextInput
        }));

    };

    sendMessage = () => { //mesaj gönderme fonksiyonu
        const { savedDocId } = this.props.route.params;
        console.log(savedDocId);
        firestore()
            .collection('forumMessages')
            .doc(savedDocId)
            .collection('chat')
            .doc()
            .set({
                message: this.state.text,
                shareMessage: auth().currentUser.uid,
                userName:UserStore.user,
                messageTime: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                console.log('Message added!');
            });
    };

    loadMessageData = () => {
        const { savedDocId } = this.props.route.params;
        firestore()
            .collection('forumMessages')
            .doc(savedDocId)
            .collection('chat')
            .orderBy('messageTime', 'asc')
            .onSnapshot(
                (snapshot) => {
                    const messageData = snapshot.docs.map((doc) => doc.data()).reverse();
                    this.setState({ messages: messageData });
                    console.log(messageData);
                },
                (error) => {
                    console.log('Error loading forum data:', error);
                }
            );
    };


    componentDidMount() {
        this.loadMessageData()
    }



    render() {
        const { messages, text, showTextInput } = this.state;
        const { itemTitle, itemDescription, savedDocId } = this.props.route.params;

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headerStyle}>
                    <Text style={{ fontWeight: "800", color: "#8232E9", fontSize: 18 }}> {itemTitle} </Text>
                </View>
                <View style={styles.describeStyle}>
                    <Text style={{ fontWeight: "700" }}>Açıklama: {
                        <Text style={{ fontWeight: "300" }}>{itemDescription} </Text>}</Text>
                </View>
                <View style={styles.divider} />

                <View style={styles.bodyStyle}>
                    <FlatList
                        style={{ marginBottom: 5 }}
                        data={this.state.messages}
                        renderItem={({ item }) => (

                            <View
                                style={[
                                    styles.messageContainer,
                                    item.shareMessage === auth().currentUser.uid ? styles.userMessage : styles.otherMessage,
                                    {
                                        alignSelf: item.shareMessage === auth().currentUser.uid ? 'flex-end' : 'flex-start'
                                    }
                                ]}
                            >
                                <View style={styles.messageContent}>
                                    <Text
                                        style={[
                                            styles.messageText,
                                            item.shareMessage === auth().currentUser.uid ? styles.userMessage : styles.otherMessage,
                                            {
                                                color: item.shareMessage === auth().currentUser.uid ? 'white' : 'black'
                                            }
                                        ]}
                                    >
                                        {item.message}
                                    </Text>
                                </View>

                                <View style={styles.messageTimeContainer}>
                                    <Text style={[styles.userNameStyle,, item.shareMessage === auth().currentUser.uid ? styles.userMessage : styles.otherMessage,
                                    {
                                        color: item.shareMessage === auth().currentUser.uid ? 'white' : 'black'
                                    }]}>
                                        {item.userName||"--"}
                                    </Text>
                                </View>
                                <View style={styles.messageTimeContainer}>
                                    <Text style={[styles.messageTime, item.shareMessage === auth().currentUser.uid ? styles.userMessage : styles.otherMessage,
                                    {
                                        color: item.shareMessage === auth().currentUser.uid ? 'white' : 'black'
                                    }]}>
                                        {item.messageTime && item.messageTime.toDate().toLocaleString()}
                                    </Text>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
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
                                    <TouchableOpacity style={styles.sendButton}
                                        onPress={this.sendMessage}>
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
        margin: 10,
        borderRadius: 25,
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
        backgroundColor: '#8232E9',
        borderRadius: 10,
        margin: 5,
        padding: 10,
        maxWidth: '70%'
    },
    userMessage: {
        alignSelf: 'flex-end',
        borderBottomLeftRadius: 25,
        borderTopStartRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: '#8232E9'
    },
    otherMessage: {
        alignSelf: 'flex-start',
        borderBottomRightRadius: 25,
        borderTopEndRadius: 25,
        borderBottomLeftRadius: 25,
        backgroundColor: '#eaeaea'
    },
    messageContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    messageText: {
        fontSize: 16,
        color: 'white',
        margin: 5,
        marginLeft: 5,
        fontWeight:"600"
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
        backgroundColor: "#d6afee",
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
        marginLeft: 10,
        marginRight: 10
    },
    messageTimeContainer: {
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 5,
        marginTop: 5,
        alignSelf: 'flex-start',
    },
    messageTime: {
        fontSize: 10,
    },
    userNameStyle:{
        textTransform: 'uppercase',
        fontSize: 11,
        fontWeight:"500"
    }
});
