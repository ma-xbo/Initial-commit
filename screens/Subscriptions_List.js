import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import AppSafeAreaView from "../components/AppSafeAreaView";
import SubscriptionItem from "../components/SubscriptionItem";
const dummyData = require("../assets/dummyData.json");

export default function Subscriptions_List(props) {
  const navigation = props.navigation;
  const [data, setData] = useState();

  useEffect(() => {
    const subData = [];

    const dataArray = dummyData.map((item) => {
      let rObj = { ...item };
      rObj["date"] = new Date(item.date);
      rObj["createdAt"] = new Date(item.createdAt);
      rObj["modifiedAt"] = new Date(item.modifiedAt);
      return rObj;
    });

    for (let index = 0; index < dataArray.length; index++) {
      const element = dataArray[index];
      if (element.isSubscription === true) {
        subData.push(element);
      }
    }
    subData.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    setData(subData);
  }, []);

  return (
    <AppSafeAreaView title="Abonnements">
      <View style={{ width: "100%" }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SubscriptionItem
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
  },
});
