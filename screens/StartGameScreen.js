import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import defaultStyles from '../constants/default-styles';
import MyButton from '../components/MyButton';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    useEffect(() => {
        // whenever app changes to landscape or portrait it will recalculate the dimensions and put this in styles
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);

        };
        
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99 ) {
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99',
            [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(parseInt(chosenNumber));
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = 
        (<Card style={styles.summaryContainer}>
            <Text>You Selected</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MyButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MyButton>
        </Card>);
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>Start a new game!</Text>
                        <Card style={styles.inputContainer}>
                            <Text style={defaultStyles.bodyText}>Select a Number</Text>
                            <Input style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType="numeric" maxLength={2} 
                            value={enteredValue} onChangeText={numberInputHandler}/>
                            <View style={styles.buttonContainer}>
                                <View style={{ width: buttonWidth }}><Button title="Reset" onPress={resetInputHandler} color={Colors.accent_color} /></View>
                                <View style={{ width: buttonWidth }}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary_color} /></View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300, // In small screen it will take 300
        alignItems: 'center'
    },
    input: {
        width: 60,
        textAlign: 'center',
    },
    buttonContainer: { 
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    // button: {
    //     // width: '40%',
    //     width: Dimensions.get('window').width / 4
    // },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
    }
});


export default StartGameScreen;
