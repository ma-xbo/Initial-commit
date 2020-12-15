import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function OverviewList_ExpenseItem(props) {
  const { title } = props;

  const text = "Hello from " + title;
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "cyan",
    margin: 2,
    padding: 8,
  },
});
