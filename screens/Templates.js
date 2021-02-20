import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Templates_List from "./Templates_List";
import Templates_Details from "./Templates_Details";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function Subscriptions() {
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
        name="Abos"
        component={Templates_List}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={Templates_Details}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
