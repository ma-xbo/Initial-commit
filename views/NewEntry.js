import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  View,
  Pressable,
} from "react-native";

export default function NewEntry() {
  const [title, setTitle] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ alignSelf: "center" }}>Hello from NewEntry</Text>
      <View style={styles.inputView}>
        <Text style={styles.inputView_text}>Titel</Text>
        <TextInput
          placeholder="Titel"
          style={styles.inputView_textInput}
          onChangeText={(val) => setTitle(val)}
        />
      </View>
      <Pressable onPress={() => alert(title)} style={styles.submitButton}>
        <Text style={{ fontSize: 18 }}>Anlegen</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "gainsboro",
  },
  inputView_text: {
    alignSelf: "center",
    fontSize: 18
  },
  inputView_textInput: {
    backgroundColor: "white",
    minWidth: 200,
    padding: 10,
    borderRadius: 18,
    marginHorizontal: 10,
  },
  inputView: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "cyan",
    width: "100%",
    padding: 10,
  },
  submitButton: {
    backgroundColor: "grey",
    borderRadius: 5,
    padding: 5,
  },
});
