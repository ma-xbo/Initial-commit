import React, { useState, useEffect } from "react";
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
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataArray = dummyData.map((item) => {
      let rObj = { ...item };
      rObj["date"] = new Date(item.date);
      rObj["createdAt"] = new Date(item.createdAt);
      rObj["modifiedAt"] = new Date(item.modifiedAt);
      return rObj;
    });

    dataArray.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    setData(dataArray);
  }, []);

  const chartWidth = Dimensions.get("window").width * 0.95;
  const chartHeight = 250;

  const dataStartDate = new Date(
    Math.min(...dummyData.map((e) => new Date(e.date)))
  );
  const dataEndDate = new Date(
    Math.max(...dummyData.map((e) => new Date(e.date)))
  );
  const msOneDay = 24 * 60 * 60 * 1000;
  const diffDays =
    Math.round(Math.abs((dataEndDate - dataStartDate) / msOneDay)) + 1;

  /* Temp */
  const valueDateArray = createDateArray(dataStartDate, diffDays);

  valueDateArray.forEach((element) => {
    let value = element.value;
    for (let index = 0; index < data.length; index++) {
      if (data[index].date.toDateString() === element.date.toDateString()) {
        value = value + data[index].amount;
      }
    }
    element.count = value;
  });
  /* Temp End */

  const chartData = [
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
        <Text style={styles.chartDescription}>Übersicht der Ausgaben pro Tag</Text>
        <ContributionGraph
          values={valueDateArray}
          endDate={dataEndDate}
          numDays={diffDays}
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
          data={chartData}
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

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function createDateArray(startDate, days) {
  const array = [];
  for (let index = 0; index < days; index++) {
    array.push({
      date: addDays(startDate, index),
      value: 0,
    });
  }
  return array;
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
