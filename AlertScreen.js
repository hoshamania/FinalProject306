import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableHighlight, Alert, TextInput, Modal} from 'react-native';
//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export function Alerts() {
    let theData = [
    ];

    const [data, setData] = useState(theData);
    const [state, setState] = useState("null");
    const [myid, setid] = useState(95);
    const [state2, setState2] = useState("null");
    const [state3, setState3] = useState("null");

    const _onPressButton = (key) => {
        var newDs = [];
        newDs = data.slice();
        newDs.pop();
        setData(newDs);
        Alert.alert('Task Completed');
    }
    _renderItem = data => {
        return (
            <TouchableHighlight
                onPress={() => _onPressButton(data.item.name)}
                underlayColor="yellow">
                <Text style={styles.row}>{data.item.date}{': '}{data.item.reminder}</Text>
            </TouchableHighlight>
        );
    };


    const updateState = () => {
        Alert.alert("New reminder: "  + state3 + "\n "+ "Due Date: " + state2);
        var newDs = [];
        newDs = data.slice();
        newDs.push({ key:myid, date:state2, reminder:state3})
        setid(myid+1);
        setData(newDs);
    };



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reminders</Text>
            <FlatList data={data} style={{flex: 3, backgroundColor: '#CED9D4', width: 300,
                borderRadius: 10}}
                      renderItem={_renderItem} />
            <TextInput style={{flex:1}}
                       style={{height: 40, fontSize: 18, alignItems: "center",}}
                       placeholder='Due Date'
                       onChangeText={(myState2) => setState2(myState2)}
            />
            <TextInput style={{flex:1}}
                       style={{height: 40, fontSize: 15, alignItems: "center",}}
                       placeholder='Note'
                       onChangeText={(myState3) => setState3(myState3)}
            />
            <Button style={{marginBottom: 100}}
                    onPress={updateState }
                    title='Add Reminder'
            />

        </View>
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
    row: {
            fontSize: 24,
            padding: 20,
            width:380,
            borderWidth: 1,
            borderColor: "#FFFFFF",
            backgroundColor: '#009688',
    },
    title: {
        flex:0.05,
        color: "black",
        fontSize: 20,
        margin: 50,
        fontWeight: "bold",
        textAlign: "center"
    },


});

