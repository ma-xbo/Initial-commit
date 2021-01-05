import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Hr from "./HorizontalRule";
const colorDefinitions = require("../assets/colorDefinition.json");

export default function HeaderMenu(props) {
  const { onPressEdit, onPressDelete } = props;
  const [displayMoreView, setDisplayMoreView] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: "flex-end" }}>
      <Pressable
        onPress={() => setDisplayMoreView(!displayMoreView)}
        style={{
          padding: 10,
        }}
      >
        <Ionicons name="ellipsis-horizontal-sharp" size={24} color="white" />
      </Pressable>
      {displayMoreView && (
        <View
          style={{
            alignItems: "center",
            backgroundColor: "cyan",
            borderRadius: 10,
          }}
        >
          <Pressable
            onPress={onPressEdit}
            style={{
              flexDirection: "row",
              padding: 10,
            }}
          >
            <Text>Edit</Text>
          </Pressable>
          <Pressable
            onPress={onPressDelete}
            style={{
              flexDirection: "row",
              padding: 10,
            }}
          >
            <Text>Delete</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
