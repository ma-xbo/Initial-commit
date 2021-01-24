import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import SegmentedControl from "@react-native-community/segmented-control";
import AppSafeAreaView from "../components/AppSafeAreaView";
import SwipeableActionItem from "../components/SwipeableActionItem";
import OverviewList_ExpenseItem from "../components/OverviewExpenseItem";
const colorDefinitions = require("../assets/colorDefinition.json");
const dummyData = require("../assets/dummyData.json");

export default function Overview_List(props) {
  const navigation = props.navigation;
  const [activeSegment, setActiveSegment] = useState(0);
  const [weekData, setWeekData] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [allData, setAllData] = useState([]);
  const selectableSegements = ["This week", "This Month", "All time"];

  useEffect(() => {
    const today = new Date();
    const weekData = [];
    const monthData = [];
    const allData = [];

    const dataArray = dummyData.map((item) => {
      let rObj = { ...item };
      rObj["date"] = new Date(item.date);
      rObj["createdAt"] = new Date(item.createdAt);
      rObj["modifiedAt"] = new Date(item.modifiedAt);
      return rObj;
    });

    for (let index = 0; index < dataArray.length; index++) {
      const element = dataArray[index];
      if (getWeekNumber(element.date) === getWeekNumber(today)) {
        weekData.push(element);
      }
      if (element.date.getUTCMonth() === today.getUTCMonth()) {
        monthData.push(element);
      }

      allData.push(element);
    }
    weekData.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    monthData.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    allData.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    setWeekData(weekData);
    setMonthData(monthData);
    setAllData(allData);
  }, []);

  const renderRightActions = (progress, itemId) => (
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
          alert(itemId);
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
        <SegmentedControl
          values={selectableSegements}
          selectedIndex={activeSegment}
          onChange={(event) => {
            setActiveSegment(event.nativeEvent.selectedSegmentIndex);
          }}
          style={{ margin: 10 }}
        />
        {activeSegment === 0 && (
          <FlatList
            data={weekData}
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
        )}
        {activeSegment === 1 && (
          <FlatList
            data={monthData}
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
        )}
        {activeSegment === 2 && (
          <FlatList
            data={allData}
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
        )}
      </View>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  dummy: {},
});

/* copied from https://www.w3resource.com/javascript-exercises/javascript-date-exercise-24.php */
function getWeekNumber(dt) {
  let tdt = new Date(dt.valueOf());
  let dayn = (dt.getDay() + 6) % 7;
  tdt.setDate(tdt.getDate() - dayn + 3);
  let firstThursday = tdt.valueOf();
  tdt.setMonth(0, 1);
  if (tdt.getDay() !== 4) {
    tdt.setMonth(0, 1 + ((4 - tdt.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - tdt) / 604800000);
}
