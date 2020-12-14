import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableHighlight, View, Image, style, StyleSheet, Button, Modal, FlatList } from 'react-native';
import {Picker} from '@react-native-picker/picker'

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addTransaction } from './TransactionActions';
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function Transactions(props) {
    let theData = [
        { key: "90", amount:"3.00", type: "-", category: "Coffee"},
        { key: "91", amount: "550.00" ,type: "+", category: "Payday"},
        { key: "92", amount: "950.00", type: "-", category: "Rent"},
        { key: "93", amount: "50.00", type: "-", category: "Savings"},
        { key: "94", amount: "550.00", type: "+", category: "Payday"},
        { key: "95", amount: "35.00", type: "+", category: "Gift"},
    ];

    const [data, setData] = useState(theData);
    const [myid, setid] = useState(95);
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
            <FlatList data={props.tns.transactions} style={{flex: 3}}
                      renderItem={_renderItem} />




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
    const { tns } = state
    return { tns }
};

export default connect(mapStateToProps)(Transactions);
