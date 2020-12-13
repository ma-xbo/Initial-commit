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
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(100);
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const selectableCategories = [];
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          alignSelf: "flex-start",
          paddingVertical: 10,
        }}
      >
        Neuer Eintrag
      </Text>
      <View style={styles.inputView}>
        <Text style={styles.inputView_text}>Titel</Text>
        <TextInput
          placeholder="Titel"
          style={styles.inputView_textInput}
          onChangeText={(val) => setTitle(val)}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputView_text}>Beschreibung</Text>
        <TextInput
          placeholder="Beschreibung"
          style={styles.inputView_textInput}
          onChangeText={(val) => setDescription(val)}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputView_text}>Betrag</Text>
        <TextInput
          placeholder="Betrag"
          style={styles.inputView_textInput}
          onChangeText={(val) => setAmount(val)}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputView_text}>Datum</Text>
        <TextInput
          placeholder="Datum"
          style={styles.inputView_textInput}
          onChangeText={(val) => setDate(val)}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputView_text}>Kategorie</Text>
        <TextInput
          placeholder="Kategorie"
          style={styles.inputView_textInput}
          onChangeText={(val) => setCategory(val)}
        />
      </View>
      <Pressable onPress={() => alert(title)} style={styles.submitButton}>
        <Text style={{ fontSize: 18, alignSelf: "center" }}>Anlegen</Text>
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
    fontSize: 16,
  },
  inputView_textInput: {
    backgroundColor: "white",
    minWidth: 220,
    padding: 10,
    borderRadius: 16,
    marginHorizontal: 10,
  },
  inputView: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: "#f3f3f3",
    width: "100%",
    padding: 10,
  },
  submitButton: {
    backgroundColor: "grey",
    alignSelf: "center",
    borderRadius: 5,
    width: "50%",
    marginVertical: 5,
    padding: 5,
  },
});
