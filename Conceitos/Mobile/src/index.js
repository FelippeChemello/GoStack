import React from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'

export default function App() {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#7519c1" />
            <View style={styles.container}>
                <Text style={styles.title}>
                    Hello World! Felippe Jaqson Chemello
                </Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7519c1',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: 21,
        fontWeight: 'bold'
    }
})