import React, { useState } from "react";
import { Dimensions, View, ScrollView, StyleSheet, Text } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import Hr from "../components/HorizontalRule";
import AppSafeAreaView from "../components/AppSafeAreaView";
const dummyData = require("../assets/dummyData.json");

/* https://github.com/indiespirit/react-native-chart-kit */

export default function Analysis(props) {
  const chartWidth = Dimensions.get("window").width * 0.95;
  const chartHeight = 250;
  const dataStartDate = new Date(
    Math.max(...dummyData.map((e) => new Date(e.date)))
  );
  const dataEndDate = new Date(
    Math.min(...dummyData.map((e) => new Date(e.date)))
  );

  const commitsData = [
    { date: "2017-01-02", count: 1 },
    { date: "2017-01-03", count: 2 },
    { date: "2017-01-04", count: 3 },
    { date: "2017-01-05", count: 4 },
    { date: "2017-01-06", count: 5 },
    { date: "2017-01-30", count: 2 },
    { date: "2017-01-31", count: 3 },
    { date: "2017-03-01", count: 2 },
    { date: "2017-04-02", count: 4 },
    { date: "2017-03-05", count: 2 },
    { date: "2017-02-30", count: 4 },
  ];

  const data = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const chartConfig2 = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: {
      r: "5",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };

  return (
    <AppSafeAreaView title="Analyse">
      <ScrollView style={styles.container}>
        <Text style={styles.chartDescription}>
          Übersicht der Ausgaben (TODO)
        </Text>
        <ContributionGraph
          values={commitsData}
          endDate={new Date("2017-04-01")}
          numDays={105}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig2}
          style={styles.chartSelf}
        />

        <Hr />

        <Text style={styles.chartDescription}>
          Übersicht der Ausgaben (TODO)
        </Text>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={chartWidth} // from react-native
          height={chartHeight}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartConfig2}
          style={styles.chartSelf}
          bezier
        />

        <Hr />
        <Text style={styles.chartDescription}>
          Übersicht der Kategorien (TODO)
        </Text>
        <PieChart
          data={data}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig2}
          accessor={"population"}
        />
        <Text>Komponente kommt hier</Text>
        <Text>Ausgaben pro Geschäft</Text>
        <Text>Komponente kommt hier</Text>
      </ScrollView>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  chartSelf: {
    alignSelf: "center",
    marginVertical: 8,
    borderRadius: 16,
  },
  chartDescription: {
    marginHorizontal: 10,
    fontSize: 20,
  },
});
