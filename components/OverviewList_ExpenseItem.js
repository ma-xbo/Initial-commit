import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import PaymentMethodIcon from "./PaymentMethodIcon";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function OverviewList_ExpenseItem(props) {
  const { onPress, itemObject } = props;
  const { title, description, amount, paymentMethod, currency } = itemObject;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <PaymentMethodIcon paymentMethod={paymentMethod} />
      <View>
        <Text>{title}</Text>
        <Text>{description}</Text>
      </View>
      <AmountText value={amount} currency={currency} />
    </Pressable>
  );
}

function AmountText(props) {
  const { value, currency } = props;

  if (value < 0) {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text style={[styles.textStyle, { color: colorDefinitions.light.red }]}>
          {value}
        </Text>
        <Text style={[styles.textStyle, { color: colorDefinitions.light.red }]}>
          {currency}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text
          style={[styles.textStyle, { color: colorDefinitions.light.green }]}
        >
          {value}
        </Text>
        <Text
          style={[styles.textStyle, { color: colorDefinitions.light.green }]}
        >
          {currency}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colorDefinitions.light.black,
    marginVertical: 4,
    marginHorizontal: 6,
    padding: 8,
    borderRadius: 5,
  },
  textStyle: {
    fontSize: 15,
  },
});
