import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PaymentMethodIcon from "./PaymentMethodIcon";
import PaymentAmountText from "./PaymentAmountText";
import Hr from "./HorizontalRule";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function Overview_Details(props) {
  const route = props.route;
  const item = JSON.parse(route.params.itemObject);

  const onPressEdit = () => {
    alert("Greetings from edit");
  };

  const onPressDelete = () => {
    alert("Greetings from delete");
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View
          style={{
            flex: 1,
            margin: 8,
            padding: 5,
            borderRadius: 10,
            borderColor: colorDefinitions.light.gray5,
            borderWidth: 0.5,
          }}
        >
          <CardItem title="Titel" text={item.title} />
          <Hr />
          <CardItem title="Beschreibung" text={item.description} />
          <Hr />
          <CardItem title="Betrag">
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                padding: 10,
                marginHorizontal: 4,
                borderRadius: 10,
              }}
            >
              <PaymentMethodIcon paymentMethod={item.paymentMethod} />
              <PaymentAmountText
                value={item.amount}
                currency={item.currency}
                fontSize={20}
              />
            </View>
          </CardItem>
          <Hr />
          <CardItem title="Datum" text={item.date.toLocaleString("en-GB")} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[
              styles.controlButton,
              { backgroundColor: colorDefinitions.light.blue },
            ]}
            onPress={onPressEdit}
          >
            <Ionicons
              name="construct"
              size={22}
              color={colorDefinitions.light.white}
            />
            <Text style={styles.controlButtonText}>Edit</Text>
          </Pressable>
          <Pressable
            style={[
              styles.controlButton,
              { backgroundColor: colorDefinitions.light.red },
            ]}
            onPress={onPressDelete}
          >
            <Ionicons
              name="trash"
              size={22}
              color={colorDefinitions.light.white}
            />
            <Text style={styles.controlButtonText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function CardItem(props) {
  const { title, text, children } = props;

  return (
    <View
      style={{
        backgroundColor: colorDefinitions.light.gray5,
        padding: 10,
        marginVertical: 6,
        marginHorizontal: 4,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          color: colorDefinitions.light.black,
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 4,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: colorDefinitions.light.black,
          fontSize: 18,
        }}
      >
        {text}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  bottomContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  controlButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    width: 150,
    padding: 6,
    marginVertical: 1,
    borderRadius: 5,
  },
  controlButtonText: {
    fontSize: 22,
    marginHorizontal: 6,
    color: colorDefinitions.light.white,
  },
});
