import React from "react";
import { Text, TextInput, StyleSheet, View, Pressable } from "react-native";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function NewEntry_Template(props) {
  const { placeholder, style = styles.numberInput, onChangeValue } = props;

  const onChanged = (text) => {
    const value = text.replace(/[^0-9]/g, '');
    onChangeValue(value);
  };

  return (
    <TextInput
      placeholder={placeholder}
      keyboardType="number-pad"
      style={style}
      onChangeText={(val) => onChanged(val)}
    />
  );
}

const styles = StyleSheet.create({
  numberInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
  },
});
