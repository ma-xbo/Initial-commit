import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import AppSafeAreaView from "../components/AppSafeAreaView";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function Settings(props) {
  const navigation = props.navigation;

  return (
    <AppSafeAreaView title="Einstellungen">
      <View style={styles.container}>
        <Text>Hello from Settings</Text>
        <Pressable
          style={styles.logoutButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  logoutButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 10,
    marginVertical: 10,
    backgroundColor: colorDefinitions.light.gray6,
    borderTopColor: colorDefinitions.light.black,
    borderBottomColor: colorDefinitions.light.black,
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoutText: {
    fontSize: 18,
    color: colorDefinitions.light.red,
  },
});
