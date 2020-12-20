import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import PaymentMethodIcon from "./PaymentMethodIcon";

const colorDefinitions = require("../assets/colorDefinition.json");

export default function OverviewList_ExpenseItem(props) {
  const { onPress, itemObject } = props;
  const { title, amount, paymentMethod } = itemObject;

  const text = "Hello from " + title;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <PaymentMethodIcon paymentMethod={paymentMethod} />
      <View>
        <Text>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colorDefinitions.light.teal,
    marginVertical: 4,
    marginHorizontal: 6,
    padding: 8,
    borderRadius: 5,
  },
});
