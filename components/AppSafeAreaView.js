import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function AppSafeAreaView(props) {
  const { title } = props;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View>{props.children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "gainsboro",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingVertical: 10,
  },
});
