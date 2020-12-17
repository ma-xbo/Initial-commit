import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AppSafeAreaView from "../components/AppSafeAreaView";
import OverviewList_ExpenseItem from "../components/OverviewList_ExpenseItem";
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
        component={List}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

function List(props) {
  const navigation = props.navigation;

  return (
    <AppSafeAreaView title="Übersicht">
      <View
        style={{
          width: "100%",
          backgroundColor: colorDefinitions.light.gray6,
        }}
      >
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OverviewList_ExpenseItem
              itemObject={item}
              onPress={() =>
                navigation.navigate("Details", {
                  itemObject: JSON.stringify(item),
                })
              }
            />
          )}
        />
      </View>
    </AppSafeAreaView>
  );
}

function Details(props) {
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

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    description: "Description 1",
    amount: 100,
    date: new Date(),
    createdBy: "Max",
    createdAt: new Date(),
    modifiedBy: "Max",
    modifiedAt: new Date(),
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    description: "Description 2",
    amount: -136,
    date: new Date(),
    createdBy: "Max",
    createdAt: new Date(),
    modifiedBy: "Max",
    modifiedAt: new Date(),
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    description: "Description 3",
    amount: 82374,
    date: new Date(),
    createdBy: "Max",
    createdAt: new Date(),
    modifiedBy: "Max",
    modifiedAt: new Date(),
  },
];
