import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import OverviewList from "./views/OverviewList";
import Settings from "./views/Settings";
import NewEntry from "./views/NewEntry";
import Optimization from "./views/Optimization";
import FinanceAnalysis from "./views/FinanceAnalysis";

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
              case "Overview":
                iconName = focused
                  ? "ios-list"
                  : "ios-list-outline";
                break;
              case "Optimization":
                iconName = focused ? "ios-pie-chart" : "ios-pie-chart-outline";
                break;
              case "NewEntry":
                iconName = focused
                  ? "ios-add-circle"
                  : "ios-add-circle-outline";
                size = 30;
                break;
              case "Analysis":
                iconName = focused ? "ios-analytics" : "ios-analytics-outline";
                break;
              case "Settings":
                iconName = focused ? "ios-settings" : "ios-settings-outline";
                break;
              default:
                break;
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#6097f0",
          inactiveTintColor: "gray",
          style: { backgroundColor: "lavender" },
        }}
      >
        <Tab.Screen name="Overview" component={OverviewList} />
        <Tab.Screen name="Optimization" component={Optimization} />
        <Tab.Screen name="NewEntry" component={NewEntry} />
        <Tab.Screen name="Analysis" component={FinanceAnalysis} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
