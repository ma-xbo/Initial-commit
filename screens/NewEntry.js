import React, { useState } from "react";
import { Text, TextInput, StyleSheet, View, Pressable } from "react-native";
import AppSafeAreaView from "../components/AppSafeAreaView";
import NewEntry_Template from "../components/NewEntry_Template";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function NewEntry() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(100);
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const selectableCategories = [];

  return (
    <AppSafeAreaView title="Neuer Eintrag">
      {/* Templates */}
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <NewEntry_Template text="Template 1" />
        <NewEntry_Template text="Template 2" />
      </View>

      <View
        style={{
          flex: 1,
          width: "100%",
        }}
      >
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
        <View style={styles.inputView}>
          <Text style={styles.inputView_text}>Kategorie</Text>
          <TextInput
            placeholder="Kategorie"
            style={styles.inputView_textInput}
            onChangeText={(val) => setCategory(val)}
          />
        </View>
        <Pressable onPress={() => alert(title)} style={styles.submitButton}>
          <Text
            style={{
              fontSize: 18,
              alignSelf: "center",
              color: "white",
              paddingVertical: 5,
            }}
          >
            Anlegen
          </Text>
        </Pressable>
      </View>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputView_text: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  inputView_textInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
  },
  inputView: {
    flex: 1,
    flexDirection: "column",
    margin: 10,
  },
  submitButton: {
    backgroundColor: colorDefinitions.light.blue,
    alignSelf: "center",
    borderRadius: 5,
    width: "50%",
    marginVertical: 5,
    marginBottom: 10,
    padding: 5,
  },
});
