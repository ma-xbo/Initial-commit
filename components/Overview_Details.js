import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import AppSafeAreaView from "./AppSafeAreaView";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function Overview_Details(props) {
  const route = props.route;
  const item = JSON.parse(route.params.itemObject);

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
          >
            <Text style={styles.controlButtonText}>Edit</Text>
          </Pressable>
          <Pressable
            style={[
              styles.controlButton,
              { backgroundColor: colorDefinitions.light.red },
            ]}
          >
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
    alignItems: "center",
    width: 150,
    padding: 6,
    marginVertical: 1,
    borderRadius: 5,
  },
  controlButtonText: {
    fontSize: 20,
    color: colorDefinitions.light.white,
  },
});

/* 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  bottom: {
    height: 100,
  },
  buttonContainer: {
    height:100,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 5,
    backgroundColor: "cyan",
  },
  controlButton: {
    alignItems: "center",
    width: 150,
    padding: 6,
    borderRadius: 5,
  },
  controlButtonText: {
    fontSize: 20,
  },
});
 */
