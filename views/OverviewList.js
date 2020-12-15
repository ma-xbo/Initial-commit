import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AppSafeAreaView from "../components/AppSafeAreaView";

export default function OverviewList() {
  return (
    <AppSafeAreaView title="Übersicht">
      <Text>Test</Text>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  dummy: {
  },
});
