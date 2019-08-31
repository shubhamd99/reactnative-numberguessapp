import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import defaultStyles from '../constants/default-styles';
import MyButton from '../components/MyButton';

// react will automatically import file according to os type
import TextComponent from '../components/Text';

const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <Text style={defaultStyles.title}>Game Over</Text>
                    <View style={styles.imageContainer}>
                    <Image style={styles.image}
                        source={require('../assets/success.png')}
                        // source={{uri: 'https://sample.com/image.png'}}
                        resizeMode="cover" 
                    />
                    </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Number of Rounds: {props.roundsNumber} And Number was: {props.userNumber}</Text>
                </View>
                <MyButton onPress={props.onRestart}>New Game</MyButton>
            </View>
            <TextComponent />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7, // 70% of the available width
        height: Dimensions.get('window').height * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    textContainer: {
        marginBottom: 15
    },
    text: {
        fontSize: 15,
        fontFamily: 'open-sans'
    }
});

export default GameOverScreen;
