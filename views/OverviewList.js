import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AppSafeAreaView from "../components/AppSafeAreaView";

export default function OverviewList() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "lavender" },
      }}
    >
      <Stack.Screen name="Übersicht" component={List} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

function List(props) {
  const navigation = props.navigation;

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <AppSafeAreaView title="Übersicht">
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </AppSafeAreaView>
  );
}

function Details({ navigation, route }) {
  const id = route.params.id;
  return (
    <View style={styles.container}>
      <Text>{"Details" + id}</Text>
      <Button title="Edit" onPress={() => navigation.navigate("Edit")} />
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
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];
