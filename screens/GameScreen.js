import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';
import MyButton from '../components/MyButton';
import defaultStyles from '../constants/default-styles';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randumNum = Math.floor(Math.random() * (max - min)) + min;

    if (randumNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randumNum;
    }
};

// For Scroll View
// const renderListItem =(value, numOfRounds) => (
//     <View key={value} style={styles.listItem}>
//         <Text style={defaultStyles.bodyText}>#{numOfRounds}</Text>
//         <Text style={defaultStyles.bodyText}>{value}</Text>
//     </View>
// );

// For FlatList
const renderListItem =(listLength, itemData) => (
    <View style={styles.listItem}>
        <Text style={defaultStyles.bodyText}>#{listLength - itemData.index}</Text>
        <Text style={defaultStyles.bodyText}>{itemData.item}</Text>
    </View>
);


// when we click on higher , the current number is the higher one, so we have to choose lower than that generated number
// when we click on lower , the current number is the lower one, so we have to choose higher than that generated number
const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);

    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setpastGuesses] = useState([initialGuess.toString()]);

    const [availabledeviceHeight, setavailabledeviceHeight] = useState(Dimensions.get('window').height)

    // useRef can't regenerate another time once it is generated, can't re-render
    // same as state, but it will not re render components
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        const updateLayout = () => {
            setavailabledeviceHeight(Dimensions.get('window').height)
        };
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]); // effects will only re run if dependency change like shouldComponentUpdate

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!', 'You know that is wrong...', [{ text: 'Sorry', style: 'cancel' }]);
            return;
        };

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(curRounds => curRounds + 1);
        setpastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    };
    
    // if (Dimensions.get('window').height > 500) {
    //     return <View>...</View>
    // }

    if (availabledeviceHeight < 500) {
        return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess:</Text>
            <View style={styles.control}>
                <MyButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MyButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                <MyButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white"/>
                </MyButton>
            </View>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList keyExtractor={(item) => item} data={pastGuesses}
                renderItem={renderListItem.bind(this, pastGuesses.length, )}
                contentContainerStyle={styles.list} />
            </View>
        </View>);
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MyButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MyButton>
                <MyButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white"/>
                </MyButton>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList keyExtractor={(item) => item} data={pastGuesses}
                renderItem={renderListItem.bind(this, pastGuesses.length, )}
                contentContainerStyle={styles.list} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // marginTop: 20,
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%'
    },
    control: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
    },
    listContainer: {
        flex: 1, // flex is important if the scroll view is suurounded by view
        width: '60%'
    },
    list: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
});

export default GameScreen;
