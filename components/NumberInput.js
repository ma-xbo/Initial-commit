import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function NumberInput(props) {
  const { placeholder, style = styles.numberInput, onChangeValue } = props;

  const onChanged = (text) => {
    const value = text.replace(/[^0-9]/g, "");
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
    fontSize: 18,
    fontWeight: "normal",
    backgroundColor: "white",
    minWidth: 100,
    padding: 10,
    borderRadius: 15,
  },
});
