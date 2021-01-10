import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import AppSafeAreaView from "../components/AppSafeAreaView";
import NumberInput from "../components/NumberInput";
import ItemPicker from "../components/ItemPicker";
import CurrencyDropdown from "../components/CurrencyDropdown";
import NewEntry_Template from "../components/NewEntry_Template";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function NewEntry() {
  const [displayOptional, setDisplayOptional] = useState(true); //isExpense
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [store, setStore] = useState(""); //Geschäft
  const [isSubscription, setIsSubscription] = useState(false); //subscription
  const [subscriptionType, setSubscriptionType] = useState(""); //subscriptionType
  const [isExpense, setIsExpense] = useState(true); //isExpense
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [currency, setCurrency] = useState("euro");
  const [paymentMethod, setPaymentMethod] = useState(
    selectablePaymentMethods[0].value
  );
  const [category, setCategory] = useState(selectableCategories[0].value);

  const submitForm = () => {
    alert("Clicked");
    console.log("Log submitted data");
    console.log("Titel:" + title);
    console.log("Beschreibung:" + description);
    console.log("Betrag:" + amount);
    console.log("Datum:" + date);
    console.log("Kategorie:" + category);

    //reset inputs
    setTitle("");
    setDescription("");
    setAmount(0);
    setDate(new Date());
    setCategory(selectableCategories[0].value);
  };

  return (
    <AppSafeAreaView title="Neuer Eintrag">
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 120 : 20}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{
            flex: 1,
            width: "100%",
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Templates */}
          <ScrollView
            horizontal
            style={{ paddingVertical: 10 }}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          >
            <NewEntry_Template text="Template 1" />
            <NewEntry_Template text="Template 2" />
            <NewEntry_Template text="Template 3" />
          </ScrollView>

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
              <Text style={styles.inputView_text}>Ausgabe</Text>
              <Switch
                onValueChange={() => setIsExpense((prevVal) => !prevVal)}
                value={isExpense}
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
                  containerStyle={{ width: "50%" }}
                  placeholderText="Betrag"
                  isNegativ={isExpense}
                  onChangeValue={(val) => setAmount(val)}
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

            <Pressable
              onPress={() => setDisplayOptional(!displayOptional)}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: colorDefinitions.light.gray2,
                padding: 10,
                margin: 5,
                marginVertical: 20,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: colorDefinitions.light.white,
                  fontSize: 20,
                }}
              >
                Optionale Felder
              </Text>
              {!displayOptional && (
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={colorDefinitions.light.white}
                />
              )}
              {displayOptional && (
                <Ionicons
                  name="arrow-down"
                  size={24}
                  color={colorDefinitions.light.white}
                />
              )}
            </Pressable>

            {displayOptional && (
              <View>
                <View style={styles.inputView}>
                  <Text style={styles.inputView_text}>Bezahlmethode</Text>
                  <ItemPicker
                    title="Wählen Sie eine Bezahlmethode aus:"
                    selectableItems={selectablePaymentMethods}
                    onValueChange={(val) => setPaymentMethod(val)}
                  />
                </View>

                <View style={styles.inputView}>
                  <Text style={styles.inputView_text}>Kategorie</Text>
                  <ItemPicker
                    title="Wählen Sie eine Kategorie aus:"
                    selectableItems={selectableCategories}
                    onValueChange={(cat) => setCategory(cat)}
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
                  <Text style={styles.inputView_text}>Empfänger</Text>
                  <TextInput
                    placeholder="Empfänger"
                    style={styles.inputView_textInput}
                    onChangeText={(val) => setDescription(val)}
                  />
                </View>

                <View style={styles.inputView}>
                  <Text style={styles.inputView_text}>Abonnement</Text>
                  <Switch
                    onValueChange={() =>
                      setIsSubscription((prevVal) => !prevVal)
                    }
                    value={isSubscription}
                  />
                </View>
              </View>
            )}
          </View>

          <View style={styles.submitButtonView}>
            <Pressable onPress={submitForm} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Anlegen</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppSafeAreaView>
  );
}

const selectableCategories = [
  { label: "Test 1", value: "test1" },
  { label: "Test 2", value: "test2" },
  { label: "Test 3", value: "test3" },
  { label: "Test 4", value: "test4" },
  { label: "Test 5", value: "test5" },
];

const selectablePaymentMethods = [
  { label: "Barzahlung", value: "cash" },
  { label: "EC-Karte", value: "debit-card" },
  { label: "Kreditkarte", value: "credit-card" },
  { label: "PayPal", value: "paypal" },
];

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
