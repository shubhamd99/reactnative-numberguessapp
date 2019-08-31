import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import Colors from '../constants/colors';

const Header = props => {
    return(
        <View style={{ ...styles.header, ...Platform.select({ ios: styles.headerIOS, android: styles.headerAndroid }) }}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    // header: {
    //     width: '100%',
    //     height: 90,
    //     paddingTop: 36,
    //     backgroundColor: Platform.OS === 'android' ? Colors.primary_color : 'white',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
    //     borderBottomWidth: Platform.OS ===  'ios' ? 1 : 0
    // },
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerAndroid: {
        backgroundColor: Colors.primary_color,
        borderBottomColor: 'transparent',
        borderBottomWidth: 0
    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }
});

export default Header;

