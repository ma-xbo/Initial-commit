import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function NewEntry_Template(props) {
  const { text } = props;

  return (
    <Pressable style={styles.container}>
      <Text>{text}</Text>
    </Pressable>
  );
}

function randomColor() {
  return colorDefinitions.light.blue;
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: randomColor,
    borderRadius: 5,
  },
});
