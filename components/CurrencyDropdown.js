import React from "react";
import { Text, TextInput, StyleSheet, View, Pressable } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function CurrencyDropdown(props) {
  const {
    selectableItems = defaultCurrency,
    defaultValue = selectableItems[0].value,
    onChangeValue,
    disabled = false,
  } = props;

  return (
    <DropDownPicker
      items={selectableItems}
      defaultValue={defaultValue}
      disabled={disabled}
      containerStyle={{ height: 40, width: 60, marginHorizontal: 10 }}
      style={{ backgroundColor: "#fafafa" }}
      itemStyle={{
        justifyContent: "flex-start",
      }}
      dropDownStyle={{ backgroundColor: "#fafafa" }}
      zIndex={1000}
      onChangeItem={(item) => onChangeValue(item.value)}
    />
  );
}

const defaultCurrency = [
  {
    label: "€",
    value: "euro",
  },
  {
    label: "$",
    value: "us_dollar",
    hidden: true,
  },
];

const styles = StyleSheet.create({});
