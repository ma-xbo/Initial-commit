import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Swipeable from "react-native-gesture-handler/Swipeable";
import SegmentedControl from "@react-native-community/segmented-control";
import { getWeekNumber } from "../Helper";
import AppSafeAreaView from "../components/AppSafeAreaView";
import SwipeableActionItem from "../components/SwipeableActionItem";
import OverviewListItem from "../components/OverviewListItem";
const colorDefinitions = require("../../assets/colorDefinition.json");

function Overview_List(props) {
  const navigation = props.navigation;
  const [activeSegment, setActiveSegment] = useState(0);
  const [weekData, setWeekData] = useState();
  const [monthData, setMonthData] = useState();
  const [allData, setAllData] = useState();
  const selectableSegements = ["This week", "This Month", "All time"];

  useEffect(() => {
    const today = new Date();
    const weekData = [];
    const monthData = [];
    const allData = [];

    const dataArray = props.financeData;

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
  }, [props.financeData]);

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
      <View style={styles.container}>
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
            keyExtractor={(item) => item.docId}
            renderItem={({ item }) => (
              <Swipeable renderRightActions={renderRightActions}>
                <OverviewListItem
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
            keyExtractor={(item) => item.docId}
            renderItem={({ item }) => (
              <Swipeable renderRightActions={renderRightActions}>
                <OverviewListItem
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
            keyExtractor={(item) => item.docId}
            renderItem={({ item }) => (
              <Swipeable renderRightActions={renderRightActions}>
                <OverviewListItem
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
  container: { flex: 1, width: "100%" },
});

const mapStateToProps = (state) => {
  return { financeData: state.finance };
};

export default connect(mapStateToProps)(Overview_List);
