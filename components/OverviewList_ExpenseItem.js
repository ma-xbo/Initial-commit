import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const colorDefinitions = require("../assets/colorDefinition.json");

export default function OverviewList_ExpenseItem(props) {
  //const { title } = props;
  const onPress = props.onPress;
  const title = props.itemObject.title;
  const amount = props.itemObject.amount;

  const text = "Hello from " + title;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Ionicons
        name="ios-construct"
        size={25}
        color={colorDefinitions.light.black}
        style={{ paddingRight: 8 }}
      />
      <View>
        <Text>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colorDefinitions.light.teal,
    marginVertical: 4,
    marginHorizontal: 6,
    padding: 8,
    borderRadius: 5,
  },
});
