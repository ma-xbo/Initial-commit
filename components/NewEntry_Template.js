import React from "react";
import { Text, TextInput, StyleSheet, View, Pressable } from "react-native";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function NewEntry_Template(props) {
  const { text } = props;

  return (
    <Pressable
      style={[
        styles.container,
        { backgroundColor: colorDefinitions.light.blue },
      ]}
    >
      <Text style={styles.textStyle}>{text}</Text>
    </Pressable>
  );
}

function randomColor() {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
  const allColors = Object.keys(colorDefinitions.light);
  const excludedColors = [
    "white",
    "black",
    "gray",
    "gray2",
    "gray3",
    "gray4",
    "gray5",
    "gray6",
  ];

  const filteredColors = allColors.filter(
    (item) => !excludedColors.includes(item)
  );

  return filteredColors[getRandomInt(filteredColors.length)];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    width: 180,
    height: 90,
    margin: 5,
    shadowColor: colorDefinitions.light.black,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  textStyle: {
    fontSize: 20,
    color: colorDefinitions.light.white,
  },
});
