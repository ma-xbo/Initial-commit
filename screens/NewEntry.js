import React, { useState } from "react";
import {
  Button,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  View,
  Pressable,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import AppSafeAreaView from "../components/AppSafeAreaView";
import NewEntry_Template from "../components/NewEntry_Template";
import NewEntry_CategorySelection from "../components/NewEntry_CategorySelection";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function NewEntry() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const selectableCategories = [
    { label: "Test 1", value: "test1" },
    { label: "Test 2", value: "test2" },
    { label: "Test 3", value: "test3" },
    { label: "Test 4", value: "test4" },
    { label: "Test 5", value: "test5" },
  ];

  const submitForm = () => {
    alert("Hello World " + date);
  };

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

      {/* Form */}
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
          {/* TODO */}
          <TextInput
            placeholder="Betrag"
            style={styles.inputView_textInput}
            onChangeText={(val) => setAmount(val)}
          />
        </View>

        <View style={styles.inputView}>
          <Text style={styles.inputView_text}>Kategorie</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.inputView_textInput}>{category}</Text>
            <Button
              title="Auswahl öffnen"
              style={{ marginHorizontal: 10 }}
              onPress={() => setShowCategoryPicker(!showCategoryPicker)}
            />
          </View>
        </View>

        <View style={styles.inputView}>
          <Text style={styles.inputView_text}>Datum</Text>
          {/* https://github.com/react-native-datetimepicker/datetimepicker */}
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            is24Hour={true}
            display="default"
            onChange={(event, date) => setDate(date)}
          />
        </View>
      </View>

      <View style={styles.submitButtonView}>
        <Pressable onPress={submitForm} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Anlegen</Text>
        </Pressable>
      </View>

      <NewEntry_CategorySelection
        categories={selectableCategories}
        visible={showCategoryPicker}
        onPress={(category) => {
          setCategory(category);
          setShowCategoryPicker(!showCategoryPicker);
        }}
      />
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
  submitButtonView: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  submitButton: {
    backgroundColor: colorDefinitions.light.blue,
    borderRadius: 5,
    width: "50%",
    marginVertical: 5,
    marginBottom: 10,
    padding: 5,
  },
  submitButtonText: {
    alignSelf: "center",
    fontSize: 18,
    color: colorDefinitions.light.white,
    paddingVertical: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
