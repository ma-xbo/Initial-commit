import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import PaymentMethodIcon from "./PaymentMethodIcon";
import PaymentAmountText from "./PaymentAmountText";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function OverviewList_ExpenseItem(props) {
  const { onPress, itemObject } = props;
  const { title, description, amount, paymentMethod, currency } = itemObject;

  const minimizeText = (text) => {
    if (text.length > 100) {
      text = text.substring(0, 100);
      text = text + "...";
    }
    return text;
  };

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <PaymentMethodIcon
        paymentMethod={paymentMethod}
        iconColor={colorDefinitions.light.white}
      />
      <View style={styles.containerText}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text style={styles.textDescr}>{minimizeText(description)}</Text>
      </View>
      <PaymentAmountText value={amount} currency={currency} fontSize={20} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colorDefinitions.light.black,
    marginVertical: 2.5,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
  },
  containerText: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colorDefinitions.light.white,
  },
  textDescr: {
    fontSize: 16,
    fontWeight: "normal",
    color: colorDefinitions.light.white,
  },
});
