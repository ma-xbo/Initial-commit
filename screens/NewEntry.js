import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppSafeAreaView from "../components/AppSafeAreaView";
import NumberInput from "../components/NumberInput";
import ItemPicker from "../components/ItemPicker";
import CurrencyDropdown from "../components/CurrencyDropdown";
import NewEntry_Template from "../components/NewEntry_Template";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function NewEntry() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [currency, setCurrency] = useState("euro");
  const [category, setCategory] = useState("");
  const selectableCategories = [
    { label: "Test 1", value: "test1" },
    { label: "Test 2", value: "test2" },
    { label: "Test 3", value: "test3" },
    { label: "Test 4", value: "test4" },
    { label: "Test 5", value: "test5" },
  ];

  const submitForm = () => {
    console.log("Log submitted data");
    console.log("Titel :" + title);
    console.log("Beschreibung :" + description);
    console.log("Betrag :" + amount);
    console.log("Datum :" + date);
    console.log("Kategorie :" + category);

    //reset inputs
    setTitle("");
    setDescription("");
    setAmount(0);
    setDate(new Date());
    setCategory(selectableCategories[0].value);
  };

  return (
    <AppSafeAreaView title="Neuer Eintrag">
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
        }}
      >
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
        <View>
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
            <View
              style={{
                flexDirection: "row",
                width: "100%",
              }}
            >
              <NumberInput
                placeholder="Betrag"
                onChangeValue={(val) => setAmount(val)}
              />
              <CurrencyDropdown
                defaultValue={currency}
                disabled={true}
                onChangeValue={(val) => setCurrency(val)}
              />
            </View>
          </View>

          <View style={styles.inputView}>
            <Text style={styles.inputView_text}>Kategorie</Text>
            <ItemPicker
              selectableItems={selectableCategories}
              onPress={(cat) => setCategory(cat)}
            />
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
      </ScrollView>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputView_text: {
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  inputView_textInput: {
    fontSize: 18,
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
});
