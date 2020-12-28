import React, { useState } from "react";
import {
  Button,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import AppSafeAreaView from "../components/AppSafeAreaView";
import NewEntry_Template from "../components/NewEntry_Template";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function NewEntry() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const selectableCategories = [];

  const submitForm = () => {
    alert(title);
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
          <TextInput
            placeholder="Betrag"
            style={styles.inputView_textInput}
            onChangeText={(val) => setAmount(val)}
          />
        </View>

        <View style={styles.inputView}>
          <Text style={styles.inputView_text}>Datum</Text>

          {/* TODO */}
          {/* https://github.com/react-native-datetimepicker/datetimepicker#linking */}
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            is24Hour={true}
            display="default"
          />
        </View>

        <View style={styles.inputView}>
          <Text style={styles.inputView_text}>Kategorie</Text>
          <Button
            title="Show Category"
            onPress={() => setShowCategoryPicker(!showCategoryPicker)}
          />
        </View>

        <Pressable onPress={submitForm} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Anlegen</Text>
        </Pressable>
      </View>

      {/* TODO */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCategoryPicker}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Wählen Sie die Kategorie aus</Text>
            <Text style={styles.modalText}>{category}</Text>
            <View style={{ padding: 10, marginVertical: 10 }}>
              <Picker
                selectedValue={category}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
              >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
            </View>
            <Button
              title="Show Category"
              onPress={() => setShowCategoryPicker(!showCategoryPicker)}
            />
          </View>
        </View>
      </Modal>
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
