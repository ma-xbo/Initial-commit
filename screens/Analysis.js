import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FinanceAnalysis() {
    return (
        <View style={styles.container}>
            <Text>Hello from FinanceAnalysis</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red'
    },
});