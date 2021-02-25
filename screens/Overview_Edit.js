import React, { useState, useEffect } from "react";
import {
  Alert,
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
import CurrencyInput from "react-native-currency-input";
import { Ionicons } from "@expo/vector-icons";
import { updateFinanceItem } from "../js/redux/actions/Finance";
import firebase from "../js/Firebase";
import NewEntry_Camera from "../components/NewEntry_Camera";
import MoneyInput from "../components/MoneyInput";
import { ObjectItemPicker, StringItemPicker } from "../components/ItemPicker";
const colorDefinitions = require("../assets/colorDefinition.json");

function Overview_Edit(props) {
  const route = props.route;
  const navigation = props.navigation;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [store, setStore] = useState();
  const [category, setCategory] = useState();
  const [amount, setAmount] = useState(0.0);
  const [amountValue, setAmountValue] = useState(0.0);
  const [unit, setUnit] = useState("€");
  const [isExpense, setIsExpense] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(
    selectablePaymentMethods[0].value
  );
  const [isSubscription, setIsSubscription] = useState(false);
  const [createdAt, setCreatedAt] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [docId, setDocId] = useState();
  const [isNewImage, setIsNewImage] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: "Bearbeiten des Eintrags",
    });

    const item = JSON.parse(route.params.itemObject);
    let expense = false;

    if (parseFloat(item.amount) < 0.0) {
      expense = true;
    } else {
      expense = false;
    }

    setTitle(item.title);
    setDescription(item.description);
    setDate(new Date(item.date));
    setStore(item.store);
    setCategory(item.category);
    setAmount(Math.abs(item.amount));
    setIsExpense(expense);
    setPaymentMethod(item.paymentMethod);
    setIsSubscription(item.isSubscription);
    setImageUrl(item.imageUrl);
    setCreatedAt(new Date(item.createdAt));
    setDocId(item.docId);
  }, [route.params.itemObject]);

  useEffect(() => {
    if (isExpense) {
      if (amount > 0) {
        setAmountValue(amount * -1);
      } else {
        setAmountValue(amount);
      }
    } else {
      if (amount < 0) {
        setAmountValue(amount * -1);
      } else {
        setAmountValue(amount);
      }
    }
  }, [isExpense, amount]);

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

  const saveEntry = async () => {
    if (isNewImage) {
      const url = await uploadImage(imageUrl);
      setImageUrl(url);
    }

    const data = {
      title: title,
      description: description,
      date: date,
      store: store,
      category: category,
      amount: amountValue,
      currency: unit,
      paymentMethod: paymentMethod,
      isSubscription: isSubscription,
      userId: props.currentUser.userId,
      createdAt: createdAt,
      modifiedAt: new Date(),
      docId: docId,
      imageUrl: imageUrl,
    };

    props.updateFinanceItem(data);

    firebase.db
      .collection("financialData")
      .doc(docId)
      .update(data)
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

    resetForm();
    navigation.navigate("Übersicht");
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 120 : 20}
        style={styles.container}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
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
              <CurrencyInput
                value={amountValue}
                onChangeValue={setAmount}
                unit={unit}
                delimiter=","
                separator="."
                precision={2}
                style={styles.inputView_textInput}
              />
            </View>

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

            {imageUrl !== "" && (
              <View style={[styles.inputView, { height: 150 }]}>
                <Image
                  style={{ flex: 1, height: null, width: null }}
                  resizeMode="contain"
                  source={{ url: imageUrl }}
                />
              </View>
            )}

            <View
              style={[
                styles.inputView,
                { flexDirection: "row", justifyContent: "space-evenly" },
              ]}
            >
              <Pressable
                onPress={() => {
                  setIsCameraVisible(true);
                }}
                style={[
                  styles.button,
                  { backgroundColor: colorDefinitions.light.gray },
                ]}
              >
                <Ionicons
                  name="ios-camera-sharp"
                  size={20}
                  color="white"
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.buttonText}>Bild aufnehmen</Text>
              </Pressable>

              {imageUrl !== "" && (
                <Pressable
                  onPress={() => {
                    setImageUrl("");
                  }}
                  style={[
                    styles.button,
                    { backgroundColor: colorDefinitions.light.red },
                  ]}
                >
                  <Ionicons
                    name="ios-camera-sharp"
                    size={20}
                    color="white"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.buttonText}>Bild entfernen</Text>
                </Pressable>
              )}
            </View>
          </View>

          <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={saveEntry}>
              <Text style={styles.buttonText}>Eintrag aktualisieren</Text>
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
              setImageUrl(pic.uri);
              setIsNewImage(true);
              setIsCameraVisible(false);
            }}
          />
        </View>
      )}
    </View>
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
  buttonView: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorDefinitions.light.blue,
    borderRadius: 5,
    marginVertical: 5,
    marginBottom: 10,
    padding: 5,
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 18,
    color: colorDefinitions.light.white,
    paddingVertical: 5,
  },
});

async function uploadImage(uri) {
  const response = await fetch(uri);
  const imageBlob = await response.blob();

  const metadata = {
    contentType: "image/jpeg",
  };
  const name = generateUUID() + "-media.jpg";
  const imageRef = firebase.storage.ref().child("images/" + name);

  const snapshot = await imageRef.put(imageBlob, metadata);
  const downloadURL = await snapshot.ref.getDownloadURL();

  return downloadURL;
}

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

const mapStateToProps = (state) => {
  return { currentUser: state.user };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateFinanceItem }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Overview_Edit);
