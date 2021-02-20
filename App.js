import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./js/redux/reducers/index";

import OverviewList from "./screens/Overview";
import Subscriptions from "./screens/Subscriptions";
import Settings from "./screens/Settings";
import NewEntry from "./screens/NewEntry";
import Analysis from "./screens/Analysis";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import firebase from "./js/Firebase";

const colorDefinitions = require("./assets/colorDefinition.json");

export default function App() {
  const Stack = createStackNavigator();

  useEffect(() => {
    firebase.init();
  }, []);

  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <NavigationContainer>
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
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="MainNav"
            options={{ headerShown: false }}
            component={MainNav}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

function MainNav() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Übersicht" || "Overview":
              iconName = focused ? "ios-list" : "ios-list-outline";
              size = 25;
              break;
            case "Abos" || "Subscriptions":
              iconName = focused ? "ios-pie-chart" : "ios-pie-chart-outline";
              size = 25;
              break;
            case "Hinzufügen" || "NewEntry":
              iconName = focused ? "ios-add-circle" : "ios-add-circle-outline";
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
      <Tab.Screen name="Abos" component={Subscriptions} />
      <Tab.Screen name="Hinzufügen" component={NewEntry} />
      <Tab.Screen name="Analyse" component={Analysis} />
      <Tab.Screen name="Einstellungen" component={Settings} />
    </Tab.Navigator>
  );
}
