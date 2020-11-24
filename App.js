import React, { useState } from 'react';

import { Alert, Text, TextInput, View, Image, style, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProgressCircle from 'react-native-progress-circle';

// You can import Ionicons from @expo/vector-icons/Ionicons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from 'react-native-vector-icons/Ionicons';

function Overview() {
    const [maxBudg, setMaxBudg] = useState(5000);
    const [amtS, setAmtS] = useState(4000);
    return (
    
    <View style={styles.container}>
        <View style={{flexDirection:"row",justifyContent: 'space-between'}}>
            
            <Button title="-$100" onPress={() => setAmtS(amtS-100)} />
            <Text>                                             </Text>
            <Button title="+$100" onPress={() => setAmtS(amtS+100)} />
            
        </View>
        <ProgressCircle
            percent={100*(amtS/maxBudg)}
            radius={100}
            borderWidth={30}
            color="lime"
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 18 }}>{"$"+amtS}</Text>
        </ProgressCircle>
      <Text>Overview!</Text>
       
    </View>
  );
}

function Transactions() {
  return (
    <View style={styles.container}>
      <Text>Transactions!</Text>
       
    </View>
  );
}

function Insights() {
  return (
    <View style={styles.container}>
      <Text>Insights!</Text>
      
    </View>
  );
}

function Alerts() {
  return (
    <View style={styles.container}>
      <Text>Alerts!</Text>
      
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
    
    return (
    
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
            } else if (route.name === 'Insights'){
                iconName = focused ? 'ios-pie' : 'ios-pie';
            } else if (route.name === 'Alerts'){
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
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

});
