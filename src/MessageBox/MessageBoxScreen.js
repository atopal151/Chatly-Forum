import React, { Component } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Text,
    SafeAreaView,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default class MessageBoxScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            text: '',
            messageData: []
        };
    }

    sendMessage = () => {
        const { uid } = this.props.route.params;
        console.log(uid);
        firestore()
            .collection('messages')
            .doc(auth().currentUser.uid + '--' + uid)
            .collection('chat')
            .doc()
            .set({
                message: this.state.text,
                shareMessage: auth().currentUser.uid,
                messageTime: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                console.log('Message added!');
            });
        firestore()
            .collection('messages')
            .doc(uid + '--' + auth().currentUser.uid)
            .collection('chat')
            .doc()
            .set({
                message: this.state.text,
                shareMessage: auth().currentUser.uid,
                messageTime: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                console.log('Message added!');
            });
    };

    loadMessageData = () => {
        const { uid } = this.props.route.params;
        firestore()
            .collection('messages')
            .doc(auth().currentUser.uid + '--' + uid)
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
        this.loadMessageData();
    }

    render() {
        const { messages, text } = this.state;
        const { route } = this.props;
        const { userName, userMail, userPhoto, uid } = route.params;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.titleStyle}>
                    <Image source={require('../../assets/pp.png')} style={styles.photo} />
                    <View style={styles.userInfo}>
                        <Text style={styles.userNameText} ellipsizeMode="tail" numberOfLines={1} maxWidth={250} overflow="hidden">
                            {userName}
                        </Text>
                        <Text style={styles.userNameText2} ellipsizeMode="tail" numberOfLines={1} maxWidth={200} overflow="hidden">
                            {userMail || userName}
                        </Text>
                    </View>
                </View>
                <FlatList
                    data={this.state.messages}
                    renderItem={({ item }) => (
                        <View
                            style={[
                                styles.messageContainer,
                                item.shareMessage === auth().currentUser.uid ? styles.userMessage : styles.otherMessage,
                                {
                                    alignSelf: item.shareMessage === auth().currentUser.uid ? 'flex-end' : 'flex-start'
                                }
                            ]}>
                            <View style={styles.messageContent}>
                                <Text style={[styles.messageText,
                                item.shareMessage === auth().currentUser.uid ? styles.userMessage : styles.otherMessage,
                                {
                                    color: item.shareMessage === auth().currentUser.uid ? 'white' : 'black'
                                }]}>{item.message}</Text>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
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
                        <Icon name="send" size={20} color="grey" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    userInfo: {
        marginLeft: 20,
        justifyContent: 'center'
    },
    titleStyle: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    photo: {
        alignItems: 'center',
        height: 50,
        width: 50
    },
    userNameText: {
        fontSize: 16,
        fontWeight: '800',
        color: 'black',
        marginLeft: 5
    },
    userNameText2: {
        fontSize: 14,
        fontWeight: '300',
        color: 'black',
        marginLeft: 5
    },
    messagesContainer: {
        paddingHorizontal: 10,
        paddingBottom: 10
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
        marginLeft: 5
    },
    messageText2: {
        fontSize: 16,
        color: 'black',
        margin: 5,
        marginLeft: 5
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        margin: 10,
        borderRadius: 30,
        borderColor: 'grey',
        paddingHorizontal: 20
    },
    input: {
        flex: 1,
        height: 40,
        margin: 5,
        color: '#333'
    },
    sendButton: {
        marginLeft: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20
    }
});
