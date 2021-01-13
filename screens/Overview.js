import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Overview_List from "./Overview_List";
import Overview_Details from "./Overview_Details";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function OverviewList() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colorDefinitions.light.black },
        headerTintColor: colorDefinitions.light.white,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Übersicht"
        component={Overview_List}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Details" component={Overview_Details} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  dummy: {},
});
