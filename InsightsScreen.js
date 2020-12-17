import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Modal, TouchableHighlight } from 'react-native';
import ReactDOM from 'react-dom';
import * as V from 'victory-native';


//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
//Navigation
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



function Insights(props) {

    const [theData, setTheData] = useState([]);
    const [theDepData, setTheDepData] = useState([]);

    useFocusEffect(
        React.useCallback(()=>{
            updateGraph();
            
        },[]),
    )

    useEffect(() => {
        const withdraw = [];
        const deposit = [];
        for (var i = 0; i < props.tns.transactions.length; i++) {
            if (props.tns.transactions[i].type === "-") {
                withdraw.push({ x: props.tns.transactions[i].category, y: props.tns.transactions[i].amount });
            }
            else if (props.tns.transactions[i].type === "+") {
                deposit.push({ x: props.tns.transactions[i].category, y: props.tns.transactions[i].amount });
            }
            
        }
        setTheData(withdraw);
        setTheDepData(deposit);
    },[]);
    
    const updateGraph = () => {
        const withdraw = [];
        const deposit = [];
        for (var i = 0; i < props.tns.transactions.length; i++) {
            if (props.tns.transactions[i].type === "-") {
                withdraw.push({ x: props.tns.transactions[i].category, y: props.tns.transactions[i].amount });
            }
            else if (props.tns.transactions[i].type === "+") {
                deposit.push({ x: props.tns.transactions[i].category, y: props.tns.transactions[i].amount });
            }

        }
        setTheData(withdraw);
        setTheDepData(deposit);
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.top}>
                <Text style={styles.captionStyle}>Your Withdrawals</Text>
                <V.VictoryPie
                    style={styles.graphStyle}
                    colorScale="warm"
                    height={300}
                    data={theData}
                />
            </View>
            <View style={styles.bottom}>
                <Text style={styles.captionStyle}>Your Deposits</Text>
                <V.VictoryPie
                    style={styles.graphStyle}
                    colorScale="cool"
                    height={300}
                    data={theDepData}
                />
            </View>
            
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 20,
        margin: 10,
    },
    top: {
        flex: 0.5,
        backgroundColor: "lightblue",
        borderWidth: 3,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    middle: {
        flex: 0.3,
        backgroundColor: "beige",
        borderWidth: 3,
    },
    bottom: {
        flex: 0.5,
        backgroundColor: "pink",
        borderWidth: 3,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    graphStyle: {
        
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
        textAlign: "center",
        justifyContent:"center"
    },
    captionStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center"
    },
});

const mapStateToProps = (state) => {
    const { tns } = state
    return { tns }
};

export default connect(mapStateToProps)(Insights);