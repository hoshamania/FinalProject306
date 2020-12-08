import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableHighlight, View, Image, style, StyleSheet, Button, Modal, FlatList } from 'react-native';
import {Picker} from '@react-native-picker/picker'

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function Transactions() {
    let theData = [
        { key: "a", amount:"3.00", type: "-", category: "Coffee"},
        { key: "b", amount: "550.00" ,type: "+", category: "Payday"},
        { key: "c", amount: "950.00", type: "-", category: "Rent"},
        { key: "d", amount: "50.00", type: "-", category: "Savings"},
        { key: "e", amount: "550.00", type: "+", category: "Payday"},
        { key: "f", amount: "35.00", type: "+", category: "Gift"},
    ];

    const [data, setData] = useState(theData);
    const [myid, setid] = useState(101);
    const [myamount, setamount] = useState(null);
    const [withDep, setWithDep] = useState({ type: "Deposit" });
    const [myDescription, setDescription] = useState("null");

    const _onPressButton = (item) => {
        Alert.alert('Transaction number: ' + item.key+"\nTransaction amount: "+item.type+item.amount);
    }
    _renderItem = data => {
        return (
            <TouchableHighlight
                onPress={() => _onPressButton(data.item)}
                underlayColor="yellow">
                <Text style={styles.row}>{data.item.category}{' \n'}{data.item.key}{': '}{data.item.type}{' '}{data.item.amount}</Text>
            </TouchableHighlight>
        );
    };

    const updateState = () => {
        Alert.alert("New transaction: " + myid + " Amount: " +myamount);
        var newDs = [];
        newDs = data.slice();
        newDs.push({ key:myid, amount:myamount, type:withDep.type, category:myDescription})
        setid(myid+1);
        setData(newDs);
    };

    return (
        <View style={styles.container}>
            <FlatList data={data} style={{flex: 3}}
                      renderItem={_renderItem} />
            <Picker
                selectedValue={withDep.type}
                style={styles.row, {height: 50, width:200}}
                onValueChange={(itemValue, itemIndex) => setWithDep({ type: itemValue })}>
            <Picker.Item label="Deposit" value="+" />
            <Picker.Item label="Withdrawal" value="-" />
            <Picker.Item label="Note" value=" " />
            </Picker>


            <TextInput style={{flex:1}}
                       style={{height: 40}}
                       placeholder='Enter description'
                       onChangeText={(myDescription) => setDescription(myDescription)}
            />
            <TextInput style={{flex:1}}
                       style={{height: 40}}
                       placeholder='Enter an amount'
                       onChangeText={(myamount) => setamount(myamount)}
            />
            <Button style={{marginBottom: 100}}
                    onPress={updateState }
                    title='Add'
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
        padding: 20,
        width:380,
        borderWidth: 1,
        borderColor: "#FFFFFF",
        backgroundColor: '#E3F2FF',
    }
});

const mapStateToProps = (state) => {
    const { transactions } = state
    return { transactions }
};

export default connect(mapStateToProps)(Transactions);
