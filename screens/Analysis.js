import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AppSafeAreaView from "../components/AppSafeAreaView";

/* https://github.com/indiespirit/react-native-chart-kit */

export default function FinanceAnalysis() {
  return (
    <AppSafeAreaView title="Analyse">
      <View style={styles.container}>
        <Text>Heatmap zu den Ausgaben (pro Datum)</Text>
        <Text>Komponente kommt hier</Text>
        <Text>Ausgaben pro Kategorie</Text>
        <Text>Komponente kommt hier</Text>
        <Text>Ausgaben pro Geschäft</Text>
        <Text>Komponente kommt hier</Text>
      </View>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
