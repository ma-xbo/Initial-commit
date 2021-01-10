import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function NumberInput(props) {
  const {
    placeholderText,
    isNegativ = true,
    value = 0,
    unit = "€",
    delimiter = ".",
    separator = ",",
    onChangeValue,
    containerStyle,
  } = props;
  const numbers = [0, 1, 2, 3, 4, 5, 6];
  const [valueInput, setValueInput] = useState(0.0);

  useEffect(() => {
    setValueInput(parseFloat(valueInput).toFixed(2));

    if (isNegativ) {
      onChangeValue(parseFloat(valueInput * -1).toFixed(2));
    } else {
      onChangeValue(parseFloat(valueInput).toFixed(2));
    }
  }, [isNegativ]);

  useEffect(() => {
    setValueInput(parseFloat(Math.abs(value)).toFixed(2));
  }, [value]);

  const onChanged = (text) => {
    let amount = text.replace(/[^0-9]/g, "");

    setValueInput(parseFloat(amount * 0.01).toFixed(2));

    if (isNegativ) {
      onChangeValue(parseFloat(amount * 0.01 * -1).toFixed(2));
    } else {
      onChangeValue(parseFloat(amount * 0.01).toFixed(2));
    }
  };

  const toCurrency = function (amountIn) {
    let amount = parseFloat(amountIn).toFixed(2);
    let splitAmount = amount.split(".")[0];
    let i = splitAmount.length - 4;

    while (i >= 0) {
      splitAmount =
        splitAmount.slice(0, i + 1) + separator + splitAmount.slice(i + 1);
      i = i - 3;
    }
    return splitAmount + delimiter + amount.split(".")[1];
  };

  return (
    <View
      style={[
        isNegativ
          ? styles.containerStyleNegativ
          : styles.containerStylePositive,
        containerStyle,
      ]}
    >
      {isNegativ && <Text style={styles.textStyle}>-</Text>}
      {true && (
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TextInput
            placeholder={placeholderText}
            keyboardType="number-pad"
            style={styles.textStyle}
            value={toCurrency(valueInput)}
            onChangeText={(val) => onChanged(val)}
          />
          {unit && <Text style={styles.textStyle}>{unit}</Text>}
        </View>
      )}

      {/*       {false && (
        <Picker
          style={{ height: 50, width: 200, marginBottom: 150 }}
          selectedValue={selectedNumber}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedNumber(itemValue);
            setInputIsFocused(true);
          }}
        >
          {numbers.map((val, index) => (
            <Picker.Item key={index} label={val.toString()} value={val} />
          ))}
        </Picker>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStylePositive: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flexBasis: "",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
  },
  containerStyleNegativ: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexBasis: "",
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
