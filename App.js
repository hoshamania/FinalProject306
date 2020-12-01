import React, { useState } from 'react';

import { Alert, Text, TextInput, TouchableHighlight, View, Image, style, StyleSheet, Button, Modal, FlatList } from 'react-native';
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
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [inputText, setInputText] = useState(0);
    
    const updateText = (text) => {
        setInputText(text);
    }
    
    
    return (
    
    <View style={styles.container}>
        <View style={{flexDirection:"row",justifyContent: 'space-between'}}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              
            <Text style={styles.modalText}>Remove amount:</Text>
            
            <TextInput style={styles.txtIn} placeholder='Enter amount' onChangeText = {text => updateText(text)} autoCapitalize = 'none' clearTextOnFocus> </TextInput>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "blue" }}
              onPress={() => {
                setModalVisible(!modalVisible);
                try{
                       setAmtS(amtS-parseFloat(inputText))
                      }
                catch{}
              }}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Remove Amount</Text>
      </TouchableHighlight>
        
            
            
            <Text>                                      </Text>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
              
                <Text style={styles.modalText}>Add amount:</Text>
            
                <TextInput style={styles.txtIn} placeholder='Enter amount' onChangeText =   {text => updateText(text)} autoCapitalize = 'none' clearTextOnFocus> </TextInput>
                <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "blue" }}
                    onPress={() => {
                    setModalVisible2(!modalVisible2);
                    try{
                       setAmtS(amtS+parseFloat(inputText))
                    }
                    catch{}
                    }}
                >
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible2(true);
        }}
      >
        <Text style={styles.textStyle}>Add Amount</Text>
      </TouchableHighlight>
            
        </View>
        <ProgressCircle
            percent={100*(amtS/maxBudg)}
            radius={100}
            borderWidth={30}
            color="lime"
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 18 }}>{"$"+amtS+"/"+maxBudg}</Text>
        </ProgressCircle>
      <Text>Overview!</Text>
       
    </View>
  );
}

function Transactions() {
    let theData = [
        { key: "a", name:"3.00", input: "-", category: "Coffee"},
        { key: "b", name: "550.00" ,input: "+", category: "Payday"},
        { key: "c", name: "950.00", input: "-", category: "Rent"},
        { key: "d", name: "50.00", input: "-", category: "Savings"},
        { key: "e", name: "550.00", input: "+", category: "Payday"},
        { key: "f", name: "35.00", input: "+", category: "Gift"},
    ];

    const [data, setData] = useState(theData);
    const [state, setState] = useState("null");
    const [state2, setState2] = useState("null");
    const [state3, setState3] = useState("null");
    const [state4, setState4] = useState("null");

    const _onPressButton = (key) => {
        Alert.alert('Transaction ' + key);
    }
    _renderItem = data => {
        return (
            <TouchableHighlight
                onPress={() => _onPressButton(data.item.name)}
                underlayColor="yellow">
                <Text style={styles.row}>{data.item.category}{' \n'}{data.item.key}{': '}{data.item.input}{' '}{data.item.name}</Text>
            </TouchableHighlight>
        );
    };

    const updateState = () => {
        Alert.alert("New transaction: " + state + " Amount: " +state2);
        var newDs = [];
        newDs = data.slice();
        newDs.push({ key:state, name:state2, input:state3, category:state4})
        setData(newDs);
    };

    return (
        <View style={styles.container}>
            <FlatList data={data} style={{flex: 3}}
                      renderItem={_renderItem} />
            <TextInput style={{flex:1}}
                       style={{height: 40}}
                       placeholder='Enter key'
                       onChangeText={(myState) => setState(myState)}
            />
            <TextInput style={{flex:1}}
                       style={{height: 40}}
                       placeholder='+/-'
                       onChangeText={(myState3) => setState(myState3)}
            />
            <TextInput style={{flex:1}}
                       style={{height: 40}}
                       placeholder='Enter category'
                       onChangeText={(myState4) => setState(myState4)}
            />
            <TextInput style={{flex:1}}
                       style={{height: 40}}
                       placeholder='Enter an amount'
                       onChangeText={(myState2) => setState2(myState2)}
            />
            <Button style={{marginBottom: 100}}
                    onPress={updateState }
                    title='Add'
            />

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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 25,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 65,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "blue",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 10,
        textAlign: "left"
    },
    txtIn: {
        height:30,
        margin:10,
        width:100,
        borderColor:'gray',
        borderWidth:1
    },
    row: {
        fontSize: 24,
        padding: 42,
        borderWidth: 1,
        borderColor: "#DDDDDD",
        backgroundColor: '#BB3333',
    }
});
