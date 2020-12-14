import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableHighlight, View, Image, style, StyleSheet, Button, Modal, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProgressCircle from 'react-native-progress-circle';

//redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import transactionReducer from './TransactionReducer';

//screens
import {Alerts} from './AlertScreen';
import {Insights} from './InsightsScreen';
import Transactions from './TransactionsScreen';
import Overview from './HomeScreen';

// You can import Ionicons from @expo/vector-icons/Ionicons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from 'react-native-vector-icons/Ionicons';


const store = createStore(transactionReducer);
const Tab = createBottomTabNavigator();

export default function App() {
    
    return (
        <Provider store={store}>
            <NavigationContainer>

                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = focused
                                    ? 'ios-clipboard'
                                    : 'ios-clipboard';
                            } else if (route.name === 'Transactions') {
                                iconName = focused ? 'ios-cash' : 'ios-cash';
                            } else if (route.name === 'Insights') {
                                iconName = focused ? 'ios-pie' : 'ios-pie';
                            } else if (route.name === 'Alerts') {
                                iconName = focused ? 'ios-mail-open' : 'ios-mail';
                            }

                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: 'green',
                        inactiveTintColor: 'gray',
                    }}
                >
                    <Tab.Screen name="Home" component={Overview} />
                    <Tab.Screen name="Transactions" component={Transactions} />
                    <Tab.Screen name="Insights" component={Insights} />
                    <Tab.Screen name="Alerts" component={Alerts} />
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
  );
}

