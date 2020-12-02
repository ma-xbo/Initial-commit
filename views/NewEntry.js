import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NewEntry() {
    return (
        <View style={styles.container}>
            <Text>Hello from NewEntry</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue'
    },
});