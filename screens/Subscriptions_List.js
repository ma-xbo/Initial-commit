import React, { useState, useEffect } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import AppSafeAreaView from "../components/AppSafeAreaView";
import SubscriptionItem from "../components/SubscriptionItem";
//const dummyData = require("../assets/dummyData.json");

function Subscriptions_List(props) {
  const navigation = props.navigation;
  const [data, setData] = useState();

  //console.log(props.financeData);

  useEffect(() => {
    const subData = [];
    const dataArray = props.financeData;
    /*     const dataArray = props.financeData.map((item) => {
      console.log("inside useEffect")
      let rObj = { ...item };
      rObj["date"] = new Date(item.date);
      rObj["createdAt"] = new Date(item.createdAt);
      rObj["modifiedAt"] = new Date(item.modifiedAt);
      return rObj;
    }); */

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
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={(item) => item.title}
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
  separator: {
    backgroundColor: "rgb(200, 199, 204)",
    height: StyleSheet.hairlineWidth,
  },
});

const mapStateToProps = (state) => {
  return { financeData: state.finance };
};

export default connect(mapStateToProps)(Subscriptions_List);
