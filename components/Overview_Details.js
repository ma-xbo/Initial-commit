import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import AppSafeAreaView from "./AppSafeAreaView";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function Overview_Details(props) {
  const route = props.route;
  const item = JSON.parse(route.params.itemObject);

  return (
    <View style={styles.container}>
      <Text>{"Title " + item.title}</Text>
      <Text>{"Amount " + item.amount}</Text>
      <Pressable>
        <Text>Edit</Text>
      </Pressable>
      <Pressable>
        <Text>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  dummy: {},
});
