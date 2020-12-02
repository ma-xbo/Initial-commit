import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OverviewList() {
    return (
        <View style={styles.container}>
            <Text>Hello from OverviewList</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue'
    },
});