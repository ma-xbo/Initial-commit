import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Subscriptions_List from "./Subscriptions_List";
const colorDefinitions = require("../../assets/colorDefinition.json");

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
        name="Abos"
        component={Subscriptions_List}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}