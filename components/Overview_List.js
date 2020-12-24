import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import AppSafeAreaView from "./AppSafeAreaView";
import SwipeableActionItem from "./SwipeableActionItem";
import OverviewList_ExpenseItem from "./OverviewList_ExpenseItem";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function Overview_List(props) {
  const navigation = props.navigation;

  const renderRightActions = (progress) => (
    <View
      style={{
        flexDirection: "row",
        width: 192,
      }}
    >
      <SwipeableActionItem
        text="Edit"
        color={colorDefinitions.light.yellow}
        x={128}
        progress={progress}
        onPress={() => {
          alert("text");
        }}
      />
      <SwipeableActionItem
        text="Delete"
        color={colorDefinitions.light.red}
        x={64}
        progress={progress}
        onPress={() => {
          alert("text");
        }}
      />
    </View>
  );

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
            <Swipeable renderRightActions={renderRightActions}>
              <OverviewList_ExpenseItem
                itemObject={item}
                onPress={() =>
                  navigation.navigate("Details", {
                    itemObject: JSON.stringify(item),
                  })
                }
              />
            </Swipeable>
          )}
        />
      </View>
    </AppSafeAreaView>
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
    currency: "€",
    paymentMethod: "paypal",
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
    currency: "€",
    paymentMethod: "cash",
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
    currency: "$",
    paymentMethod: "card",
    date: new Date(),
    createdBy: "Max",
    createdAt: new Date(),
    modifiedBy: "Max",
    modifiedAt: new Date(),
  },
];
