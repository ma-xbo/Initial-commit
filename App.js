import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import OverviewList from "./screens/Overview";
import Settings from "./screens/Settings";
import NewEntry from "./screens/NewEntry";
import Optimization from "./screens/Optimization";
import FinanceAnalysis from "./screens/Analysis";

const colorDefinitions = require("./assets/colorDefinition.json");

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        //Vorbereitung für die verwendung von Icons --> Library muss noch ausgesucht und installiert werden
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case "Übersicht" || "Overview":
                iconName = focused ? "ios-list" : "ios-list-outline";
                size = 25;
                break;
              case "Kategorien" || "Optimization":
                iconName = focused ? "ios-pie-chart" : "ios-pie-chart-outline";
                size = 25;
                break;
              case "Hinzufügen" || "NewEntry":
                iconName = focused
                  ? "ios-add-circle"
                  : "ios-add-circle-outline";
                size = 32;
                break;
              case "Analyse" || "Analysis":
                iconName = focused ? "ios-analytics" : "ios-analytics-outline";
                size = 25;
                break;
              case "Einstellungen" || "Settings":
                iconName = focused ? "ios-settings" : "ios-settings-outline";
                size = 25;
                break;
              default:
                break;
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: colorDefinitions.light.teal,
          inactiveTintColor: colorDefinitions.light.gray,
          style: { backgroundColor: colorDefinitions.light.gray6 },
        }}
      >
        <Tab.Screen name="Übersicht" component={OverviewList} />
        <Tab.Screen name="Kategorien" component={Optimization} />
        <Tab.Screen name="Hinzufügen" component={NewEntry} />
        <Tab.Screen name="Analyse" component={FinanceAnalysis} />
        <Tab.Screen name="Einstellungen" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
