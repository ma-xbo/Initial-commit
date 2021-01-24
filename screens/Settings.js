import React, { useState } from "react";
import { View, FlatList, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppSafeAreaView from "../components/AppSafeAreaView";
const colorDefinitions = require("../assets/colorDefinition.json");
const dummyProfile = require("../assets/dummyProfile.json");

export default function Settings(props) {
  const navigation = props.navigation;
  const [displayOptional, setDisplayOptional] = useState(true);
  const categoriesArray = dummyProfile.categories;

  return (
    <AppSafeAreaView title="Einstellungen">
      <View style={styles.container}>
        <Text>Definition der Kategorien</Text>
        <Pressable
          onPress={() => setDisplayOptional(!displayOptional)}
          style={[
            {
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: colorDefinitions.light.gray2,
              padding: 10,
              marginTop: 20,
              marginHorizontal: 5,
              borderTopEndRadius: 10,
              borderTopStartRadius: 10,
            },
            !displayOptional && {
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            },
          ]}
        >
          <Text
            style={{
              color: colorDefinitions.light.white,
              fontSize: 20,
            }}
          >
            Kategorien
          </Text>
          {!displayOptional && (
            <Ionicons
              name="arrow-back"
              size={24}
              color={colorDefinitions.light.white}
            />
          )}
          {displayOptional && (
            <Ionicons
              name="arrow-down"
              size={24}
              color={colorDefinitions.light.white}
            />
          )}
        </Pressable>
        {displayOptional && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: colorDefinitions.light.gray3,
              padding: 10,
              marginHorizontal: 5,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            <FlatList
              data={categoriesArray}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CategoryListItem name={item} />}
            />
          </View>
        )}

        <Pressable
          style={styles.logoutButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </AppSafeAreaView>
  );
}

function CategoryListItem(props) {
  const { name } = props;

  return (
    <View
      style={{
        padding: 5,
        borderBottomWidth: 0.2,
        borderTopWidth: 0.2,
      }}
    >
      <Text>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  logoutButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 10,
    marginVertical: 10,
    backgroundColor: colorDefinitions.light.gray6,
    borderTopColor: colorDefinitions.light.black,
    borderBottomColor: colorDefinitions.light.black,
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoutText: {
    fontSize: 18,
    color: colorDefinitions.light.red,
  },
});
