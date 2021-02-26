import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";
const colorDefinitions = require("../../assets/colorDefinition.json");

export default function PaymentMethodIcon(props) {
  const { paymentMethod, iconColor} = props;

  const iconSize = 25;

  switch (paymentMethod) {
    case "card":
      return (
        <Ionicons
          name={"card"}
          size={iconSize}
          color={iconColor}
          style={styles.icon}
        />
      );

    case "cash":
      return (
        <FontAwesome
          name="money"
          size={iconSize}
          color={iconColor}
          style={styles.icon}
        />
      );

    case "paypal":
      return (
        <Entypo
          name="paypal"
          size={iconSize}
          color={iconColor}
          style={styles.icon}
        />
      );

    default:
      return (
        <Ionicons
          name={"checkmark"}
          size={iconSize}
          color={iconColor}
          style={styles.icon}
        />
      );
  }
}

const styles = StyleSheet.create({
  icon: {
    paddingRight: 8,
  },
});
