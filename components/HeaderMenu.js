import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Hr from "./HorizontalRule";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function HeaderMenu(props) {
  const { onPressEdit, onPressDelete } = props;
  const [displayMoreView, setDisplayMoreView] = useState(false);

  return (
    <View style={styles.componentContainer}>
      <Pressable
        onPress={() => setDisplayMoreView(!displayMoreView)}
        style={styles.headerItem}
      >
        <Ionicons name="ellipsis-horizontal-sharp" size={24} color="white" />
      </Pressable>
      {displayMoreView && (
        <View style={styles.menuContainer}>
          <Pressable onPress={onPressEdit} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Edit</Text>
          </Pressable>
          <Hr thickness={0.7} />
          <Pressable onPress={onPressDelete} style={styles.menuItem}>
            <Text style={styles.menuItemText}>Delete</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  componentContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  headerItem: {
    padding: 10,
  },
  menuContainer: {
    alignSelf: "center",
    backgroundColor: colorDefinitions.light.gray5,
    width: 150,
    marginRight: 5,
    borderRadius: 10,
    shadowColor: colorDefinitions.light.black,
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  menuItemText: {
    fontSize: 20,
    color: colorDefinitions.light.blue,
  },
});
