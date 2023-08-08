import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Ionicons"
import HomeScreen from './HomePage/HomeScreen';
import FavoriteScreen from './FavoritePage/FavoriteScreen';
import ProfileScreen from './ProfilePage/ProfileScreen';
import LoginScreen from './LoginPage/LoginScreen';
import SingupScreen from './SignUpPage/SingupScreen';
import ChatScreen from './ChatPage/ChatScreen';
import MessageBoxScreen from './MessageBox/MessageBoxScreen';
import ForumDetail from './HomePage/ForumDetail';
import AddForum from './HomePage/AddForum';



const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator >
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ tabBarShowLabel: false, headerShown: false }} />
            <HomeStack.Screen name="ForumDetail" component={ForumDetail} options={{ tabBarShowLabel: false, headerShown: false }} />
            <HomeStack.Screen name="AddForum" component={AddForum} options={{ tabBarShowLabel: false, headerShown: false }} />
        </HomeStack.Navigator>
    );
}

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator >
            <ProfileStack.Screen name="ProfileSreen" component={ProfileScreen} options={{ tabBarShowLabel: false, headerShown: false }} />
            <ProfileStack.Screen name="ForumDetail" component={ForumDetail} options={{ tabBarShowLabel: false, headerShown: false }} />
            
        </ProfileStack.Navigator>
    );
}

const ChatStack = createNativeStackNavigator();

function ChatStackScreen() {
    return (
        <ChatStack.Navigator >
            <ChatStack.Screen name="ChatScreen" component={ChatScreen} options={{ tabBarShowLabel: false, headerShown: false }} />
            <ChatStack.Screen name="MessageBoxScreen" component={MessageBoxScreen} options={{ tabBarShowLabel: false, headerShown: false }} />
      
        </ChatStack.Navigator>
    );
}

const FavoriteStack = createNativeStackNavigator();

function FavoriteStackScreen() {
    return (
        <FavoriteStack.Navigator >
            <FavoriteStack.Screen name="FavoriteScreen" component={FavoriteScreen} options={{ tabBarShowLabel: false, headerShown: false }} />
            <FavoriteStack.Screen name="MessageBoxScreen" component={MessageBoxScreen} options={{ tabBarShowLabel: false, headerShown: false }} />
      
        </FavoriteStack.Navigator>
    );
}


const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, name }) => {
    let iconName, iconSize, iconColor;
    if (name === 'HomeStackScreen') {
        iconName = focused ? 'home' : 'home-outline';
        iconSize = focused ? 28 : 22;
        iconColor = focused ? '#8232E9' : '#AAAAAA';
    } else if (name === 'ChatStackScreen') {
        iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
        iconSize = focused ? 28 : 22;
        iconColor = focused ? '#8232E9' : '#AAAAAA';
    } else if (name === 'FavoriteStackScreen') {
        iconName = focused ? 'heart' : 'heart-outline';
        iconSize = focused ? 28 : 22;
        iconColor = focused ? '#8232E9' : '#AAAAAA';
    } else if (name === 'ProfilStackScreen') {
        iconName = focused ? 'person' : 'person-outline';
        iconSize = focused ? 28 : 22;
        iconColor = focused ? '#8232E9' : '#AAAAAA';
    }
    return <Icon name={iconName} size={iconSize} color={iconColor} />;
};



function TabBar() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => TabBarIcon({ focused, name: route.name }),
            tabBarStyle: {
                backgroundColor: '#FFFFFF',
                borderTopWidth: 0, // Tab çubuğunun üst çerçevesini kaldırır
                elevation: 0
            },
            tabBarShowLabel: false,
            headerShown: false,
            tabBarLabelStyle: {
                fontSize: 12,
            },
        })} >
            <Tab.Screen name="HomeStackScreen" component={HomeStackScreen} />
            <Tab.Screen name="ChatStackScreen" component={ChatStackScreen} />
            <Tab.Screen name="FavoriteStackScreen" component={FavoriteStackScreen} />
            <Tab.Screen name="ProfilStackScreen" component={ProfileStackScreen} />
        </Tab.Navigator>
    );
}

const Stack = createNativeStackNavigator();

export default class Router extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignUp" component={SingupScreen} options={{ headerShown: false }} />
                   
                    <Stack.Screen name="TabBar" component={TabBar} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}