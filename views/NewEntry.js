import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, StyleSheet, View, Pressable } from 'react-native';

export default function NewEntry() {
    const [title, setTitle] = useState('');
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ alignSelf: 'center' }}>Hello from NewEntry</Text>
            <View style={styles.midView} >
                <Text>Titel</Text>
                <TextInput
                    placeholder='Titel'
                    style={styles.textInput}
                    onChangeText={(val) => setTitle(val)}
                />
            </View>
            <Pressable
                onPress={() => alert(title)}
                style={styles.submitButton}
            >
                <Text>Button</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'gainsboro',
    },
    textInput: {
        backgroundColor: 'white',
        minWidth: 200,
        padding: 10,
        borderRadius: 18,
        marginHorizontal: 10
    },
    midView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'cyan',
        width:'100%',
        padding: 10,

    },
    submitButton: {
        backgroundColor: 'darkblue',
        padding: 5
    }
});