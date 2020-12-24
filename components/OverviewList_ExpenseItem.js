import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import PaymentMethodIcon from "./PaymentMethodIcon";
import PaymentAmountText from "./PaymentAmountText";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function OverviewList_ExpenseItem(props) {
  const { onPress, itemObject } = props;
  const { title, description, amount, paymentMethod, currency } = itemObject;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <PaymentMethodIcon
          paymentMethod={paymentMethod}
          iconColor={colorDefinitions.light.white}
        />
        <View>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      </View>
      <PaymentAmountText value={amount} currency={currency} fontSize={20} />
    </Pressable>
  );
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
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colorDefinitions.light.white,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: "normal",
    color: colorDefinitions.light.white,
  },
});
