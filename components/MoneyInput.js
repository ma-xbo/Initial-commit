import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function MoneyInput(props) {
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
  const [valueInput, setValueInput] = useState("0.00");

  useEffect(() => {
    setValueInput(parseFloat(valueInput).toFixed(2));

    if (isNegativ) {
      onChangeValue(parseFloat(valueInput * -1).toFixed(2));
    } else {
      onChangeValue(parseFloat(valueInput).toFixed(2));
    }
  }, [isNegativ]);

  useEffect(() => {
    const valAsFloat = Math.abs(parseFloat(value)).toFixed(2);
    setValueInput(valAsFloat);
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
