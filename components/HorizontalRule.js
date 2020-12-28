import React from "react";
import { View } from "react-native";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function Hr(props) {
  const { thickness, color } = props;
  return (
    <View
      style={{
        borderWidth: thickness || 0.5,
        borderColor: color || colorDefinitions.light.gray4,
        marginVertical: 4,
      }}
    />
  );
}
