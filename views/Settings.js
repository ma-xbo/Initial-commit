import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Settings() {
    return (
        <View style={styles.container}>
            <Text>Hello from Settings</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue'
    },
});