import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableHighlight, View, Image, style, StyleSheet, Button, Modal } from 'react-native';

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProgressCircle from "react-native-progress-circle";
import { addTransaction } from './TransactionActions';



function Overview(props) {
    const [maxBudg, setMaxBudg] = useState(5000);
    const [amtS, setAmtS] = useState(4000);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [inputText, setInputText] = useState(0);
    const [transactionDetains, setDetails] = useState("");
    const [progressColor, setColor]=useState("rgb(10,255,10)");


    const updateText = (text) => {
        
        if(isNaN(text)){
            Alert.alert("Please input only numbers")
        }else{
            setInputText(text);
        }
        
    }

    //hokey way of making the progressCircle change color
    //lime "rgb(10,255,10)"
    //red  "rgb(255,10,10)"
    const updatePColor= (amount, wD)=>{
        var vitalInfo=[amount, wD, transactionDetains];
        props.addTransaction(vitalInfo);

        let remaining = amtS;
        let halfMax = maxBudg/2;
        if(wD=="-"){
            remaining=amtS-amount;
        }else{
            remaining=amtS+parseFloat(amount);
        }
        let r=10;
        let g= 10;
        if(remaining>(halfMax)){
            //for the first half of the budget the red vaule increases giving a yellow hue
            g=255
            r= (245*(1-((remaining-halfMax)/halfMax)))+10;
        }else{
            //for the second half of the budget the green decreases to go to red
            r=255
            g= (245*(remaining/(halfMax)))-20;
            //Alert.alert("green decrease");
        }
        setColor('"rgb('+r+','+g+',10)"');
       
    }


    return (

        <View style={styles.container}>
            <Image source={{uri:'https://previews.123rf.com/images/tribalium123/tribalium1231306/tribalium123130600043/20192008-money-in-the-hand-hand-with-money-hand-holding-banknotes.jpg'}}
                   style={{flex: .4,width: 100, height: 70}}/>
            <Text style={styles.title}>tonddie.</Text>

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

                            <Text style={styles.modalText}>Withdraw:</Text>

                            <TextInput style={styles.txtIn} keyboardType="decimal-pad" placeholder='Enter amount' onChangeText = {text => updateText(text)} autoCapitalize = 'none' clearTextOnFocus> </TextInput>
                            <Text style={styles.modalText}>Details:</Text>
                            <TextInput style={styles.txtIn } placeholder='' onChangeText =   {text2 => setDetails(text2)} autoCapitalize = 'none' clearTextOnFocus> </TextInput>
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "blue" }}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    try{
                                            if(parseFloat(inputText)<0){
                                                Alert.alert("No negatives!");
                                            }else if(isNaN(parseFloat(inputText))){
                                                Alert.alert("Numbers only");
                                            }else if(amtS-parseFloat(inputText)<0){
                                                Alert.alert("Not enough money!");
                                            }else{
                                                setAmtS(amtS-parseFloat(inputText));
                                                updatePColor(inputText,"-");
                                            }                           
                                        
                                        
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
                    <Text style={styles.textStyle}>Withdraw</Text>
                </TouchableHighlight>



                <Text>  </Text>
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

                            <Text style={styles.modalText}>Deposit:</Text>

                            <TextInput style={styles.txtIn} keyboardType="decimal-pad" placeholder='Enter amount' onChangeText =   {text => updateText(text)} autoCapitalize = 'none' clearTextOnFocus> </TextInput>
                            <Text style={styles.modalText}>Details:</Text>
                            <TextInput style={styles.txtIn} placeholder='' onChangeText =   {text2 => setDetails(text2)} autoCapitalize = 'none' clearTextOnFocus> </TextInput>
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "blue" }}
                                onPress={() => {
                                    setModalVisible2(!modalVisible2);
                                    try{
                                        if(parseFloat(inputText)<0){
                                            Alert.alert("No negatives!");

                                        }else if(isNaN(parseFloat(inputText))){
                                            Alert.alert("Numbers only");
                                        }else{
                                            setAmtS(amtS+parseFloat(inputText));
                                            setMaxBudg(maxBudg+parseFloat(inputText));
                                            updatePColor(inputText,"+");
                                        }
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
                    <Text style={styles.textStyle}>Deposit</Text>
                </TouchableHighlight>

            </View>
            <ProgressCircle
                percent={100*(amtS/maxBudg)}
                radius={100}
                borderWidth={30}
                color= {progressColor}
                shadowColor="#999"
                bgColor="#fff"
            >
                <Text style={{ fontSize: 18 }}>{"$"+amtS+"/"+maxBudg}</Text>
            </ProgressCircle>


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
    title: {
        flex:0.2,
        color: "black",
    fontSize: 40,
    margin: 40,
    fontWeight: "bold",
    textAlign: "center"
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
    
});

const mapStateToProps = (state) => {
    const { tns } = state
    return { tns }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
      addTransaction,
    }, dispatch)
  );

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
