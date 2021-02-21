import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { addTemplate } from "../js/redux/actions/User";
import { addFinanceItem } from "../js/redux/actions/Finance";
import firebase from "../js/Firebase";
import AppSafeAreaView from "../components/AppSafeAreaView";
import MoneyInput from "../components/MoneyInput";
import { ObjectItemPicker, StringItemPicker } from "../components/ItemPicker";
import NewEntry_Template from "../components/NewEntry_Template";
import NewEntry_Camera from "../components/NewEntry_Camera";
const colorDefinitions = require("../assets/colorDefinition.json");

function NewEntry(props) {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [store, setStore] = useState(props.currentUser.config.stores[0]);
  const [category, setCategory] = useState(
    props.currentUser.config.categories[0]
  );
  const [isExpense, setIsExpense] = useState(true);
  const [isSubscription, setIsSubscription] = useState(false);
  const [amount, setAmount] = useState(0.0);
  const [paymentMethod, setPaymentMethod] = useState(
    selectablePaymentMethods[0].value
  );
  const [picture, setPicture] = useState();

  //TODO
  // add picture to redux --> save pictureObject in the entry?
  // add picture to cloud --> picture to blob?

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate(new Date());
    setStore(props.currentUser.config.stores[0]);
    setCategory(props.currentUser.config.categories[0]);
    setAmount(0.0);
    setPaymentMethod(selectablePaymentMethods[0].value);
    setIsSubscription(false);
  };

  const submitForm = () => {
    let data = {
      title: title,
      description: description,
      date: date,
      store: store,
      category: category,
      amount: amount,
      currency: "€",
      paymentMethod: paymentMethod,
      isSubscription: isSubscription,
      userId: props.currentUser.userId,
      createdAt: new Date(),
      modifiedAt: new Date(),
    };

    firebase.db
      .collection("financialData")
      .add(data)
      .then((docRef) => {
        Alert.alert(
          "Hinzufügen erfolgreich ➕",
          "Die Daten wurden erfolgreich in der Cloud gespeichert"
        );

        data["docId"] = docRef.id;

        props.addFinanceItem(data);

        resetForm();
      })
      .catch((error) => {
        Alert.alert(
          "Fehler",
          "Beim Speichern in der Cloud ist ein Fehler aufgetreten: " +
            error.message
        );
      });
  };

  const saveAsTemplate = () => {
    const data = {
      title: title,
      description: description,
      date: date,
      store: store,
      category: category,
      amount: amount,
      currency: "€",
      paymentMethod: paymentMethod,
      isSubscription: isSubscription,
      userId: props.currentUser.userId,
      createdAt: new Date(),
      modifiedAt: new Date(),
      templateColor: colorDefinitions.light.blue,
      templateId: generateUUID(),
    };

    props.addTemplate(data);

    firebase.db
      .collection("userProfiles")
      .doc(props.currentUser.userId)
      .update({
        "config.templates": firebase.fieldVal.arrayUnion(data),
      })
      .then(() => {
        Alert.alert(
          "Erfolgreich aktualisiert",
          "Die Daten wurden erfolgreich in der Cloud gespeichert"
        );
      })
      .catch((error) => {
        Alert.alert(
          "Fehler",
          "Beim Speichern in der Cloud ist ein Fehler aufgetreten: " +
            error.message
        );
      });
  };

  return (
    <AppSafeAreaView title="Neuer Eintrag">
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 120 : 20}
        style={styles.container}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          {/* Templates */}
          <FlatList
            horizontal
            style={{ paddingVertical: 10 }}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            data={props.currentUser.config.templates}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyExtractor={(item) => item.templateId}
            renderItem={({ item }) => (
              <NewEntry_Template
                text={item.title}
                onPress={() => {
                  setTitle(item.title);
                  setDescription(item.description);
                  setDate(item.date);
                  if (item.amount < 0) {
                    setAmount(Math.abs(item.amount));
                    setIsExpense(true);
                  } else {
                    setAmount(item.amount);
                    setIsExpense(false);
                  }
                  setPaymentMethod(item.paymentMethod);
                  setCategory(item.category);
                  setStore(item.store);
                  setIsSubscription(item.isSubscription);
                }}
              />
            )}
          />

          {/* Form */}
          <View>
            <View style={styles.inputView}>
              <Text style={styles.inputView_text}>Titel</Text>
              <TextInput
                placeholder="Titel"
                style={styles.inputView_textInput}
                onChangeText={(val) => setTitle(val)}
                value={title}
              />
            </View>

            <View style={styles.inputView}>
              <Text style={styles.inputView_text}>Datum</Text>
              {/* https://github.com/react-native-datetimepicker/datetimepicker */}
              <DateTimePicker
                testID="dateTimePicker"
                is24Hour={true}
                display="default"
                onChange={(event, date) => setDate(date)}
                value={date}
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
                <MoneyInput
                  containerStyle={{ width: "50%" }}
                  placeholderText="Betrag"
                  isNegativ={isExpense}
                  value={amount}
                  onChangeValue={(val) => setAmount(val)}
                />
              </View>
            </View>

            <View>
              <View style={styles.inputView}>
                <Text style={styles.inputView_text}>Bezahlmethode</Text>
                <ObjectItemPicker
                  title="Wählen Sie eine Bezahlmethode aus:"
                  selectableItems={selectablePaymentMethods}
                  onValueChange={(val) => setPaymentMethod(val)}
                  value={paymentMethod}
                />
              </View>

              <View style={styles.inputView}>
                <Text style={styles.inputView_text}>Kategorie</Text>
                <StringItemPicker
                  title="Wählen Sie eine Kategorie aus:"
                  selectableItems={props.currentUser.config.categories}
                  onValueChange={(cat) => setCategory(cat)}
                  value={category}
                />
              </View>

              <View style={styles.inputView}>
                <Text style={styles.inputView_text}>Geschäft</Text>
                <StringItemPicker
                  title="Wählen Sie ein Geschäft aus:"
                  selectableItems={props.currentUser.config.stores}
                  onValueChange={(cat) => setStore(cat)}
                  value={store}
                />
              </View>

              <View style={styles.inputView}>
                <Text style={styles.inputView_text}>Beschreibung</Text>
                <TextInput
                  placeholder="Beschreibung"
                  style={styles.inputView_textInput}
                  onChangeText={(val) => setDescription(val)}
                  value={description}
                />
              </View>

              <View style={styles.inputView}>
                <Text style={styles.inputView_text}>Abonnement</Text>
                <Switch
                  onValueChange={() => setIsSubscription((prevVal) => !prevVal)}
                  value={isSubscription}
                />
              </View>

              {picture && (
                <View style={[styles.inputView,{height:150}]}>
                  <Image
                    style={{flex:1, height: null, width: null}}
                    resizeMode="contain"
                    source={picture}
                  />
                </View>
              )}

              <View style={styles.inputView}>
                <Pressable
                  onPress={() => {
                    setIsCameraVisible(true);
                  }}
                  style={[
                    styles.submitButton,
                    { backgroundColor: colorDefinitions.light.gray },
                  ]}
                >
                  <Ionicons
                    name="ios-camera-sharp"
                    size={20}
                    color="white"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.submitButtonText}>Bild aufnehmen</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.submitButtonView}>
            <Pressable onPress={submitForm} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Eintrag speichern</Text>
            </Pressable>
          </View>

          <View style={styles.submitButtonView}>
            <Pressable onPress={saveAsTemplate} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>
                Als Template speichern
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {isCameraVisible && (
        <View style={StyleSheet.absoluteFill}>
          <NewEntry_Camera
            onCancel={() => {
              setIsCameraVisible(false);
            }}
            onSavePicture={(pic) => {
              setPicture(pic);
              setIsCameraVisible(false);
            }}
          />
        </View>
      )}
    </AppSafeAreaView>
  );
}

const selectablePaymentMethods = [
  { label: "Barzahlung", value: "cash" },
  { label: "EC-Karte", value: "debit-card" },
  { label: "Kreditkarte", value: "credit-card" },
  { label: "PayPal", value: "paypal" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorDefinitions.light.blue,
    borderRadius: 5,
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

const mapStateToProps = (state) => {
  return { currentUser: state.user };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addFinanceItem, addTemplate }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewEntry);

/* https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid */
function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
