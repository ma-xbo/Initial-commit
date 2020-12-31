import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppSafeAreaView from "./AppSafeAreaView";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function Overview_Details(props) {
  const route = props.route;
  const item = JSON.parse(route.params.itemObject);

  const onPressEdit = () => {
    alert("Greetings from edit");
  };

  const onPressDelete = () => {
    alert("Greetings from delete");
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text>{"Title " + item.title}</Text>
        <Text>{"Amount " + item.amount}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[
              styles.controlButton,
              { backgroundColor: colorDefinitions.light.green },
            ]}
            onPress={onPressEdit}
          >
            <Ionicons
              name="construct"
              size={22}
              color={colorDefinitions.light.white}
            />
            <Text style={styles.controlButtonText}>Edit</Text>
          </Pressable>
          <Pressable
            style={[
              styles.controlButton,
              { backgroundColor: colorDefinitions.light.red },
            ]}
            onPress={onPressDelete}
          >
            <Ionicons
              name="trash"
              size={22}
              color={colorDefinitions.light.white}
            />
            <Text style={styles.controlButtonText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  bottomContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  controlButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    width: 150,
    padding: 6,
    marginVertical: 1,
    borderRadius: 5,
  },
  controlButtonText: {
    fontSize: 22,
    marginHorizontal: 6,
    color: colorDefinitions.light.white,
  },
});
