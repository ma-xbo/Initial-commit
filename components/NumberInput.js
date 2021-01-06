import React from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";

export default function NumberInput(props) {
  const {
    placeholderText,
    isNegativ = true,
    unit = "€",
    delimiter = ".",
    separator = ",",
    precision = 2,
    onChangeValue,
  } = props;

  const onChanged = (text) => {
    const value = text.replace(/[^0-9]/g, "");
    onChangeValue(value);
  };

  return (
    <View style={styles.containerStyle}>
      {isNegativ && <Text style={styles.textStyle}>-</Text>}
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder={placeholderText}
          keyboardType="number-pad"
          style={styles.textStyle}
          onChangeText={(val) => onChanged(val)}
        />
        {unit && <Text style={styles.textStyle}>{unit}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "normal",
    color: "black",
    paddingHorizontal: 5,
  },
});
